import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { featureFlags } from '@/lib/feature-flags';
import { ux } from '@/lib/ux';
import { cn } from '@/lib/utils';
import { getDerivedCurriculum } from '@/lib/api-helpers/profile';

export default async function StaffDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const role = session.user.role;
  const isAdmin = session.user.isAdmin;
  if (role !== 'counselor') {
    redirect('/');
  }

  const roleTitle = isAdmin ? 'Admin Counselor' : 'Counselor';

  // Get students based on role
  let students: any[] = [];
  if (featureFlags.counselorDashboard.studentsList) {
    const where: any = {
      user: {
        organizationId: session.user.organizationId,
      },
    };

    if (!isAdmin) {
      where.counselorId = session.user.id;
    }

    students = await prisma.student.findMany({
      where,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        personalProfile: true,
        transcripts: true,
        activities: true,
      },
      orderBy: {
        user: {
          lastName: 'asc',
        },
      },
    });
  }

  // Get Meeting Stats
  const [pendingRequestsCount, upcomingMeetingsCount] = await Promise.all([
    prisma.meetingRequest.count({
      where: { hostId: session.user.id, status: 'Pending' }
    }),
    prisma.meeting.count({
      where: { hostId: session.user.id, status: 'Upcoming', startTime: { gt: new Date() } }
    })
  ]);

  const studentsByPhase = {
    Onboarding: students.filter((s) => s.phase === 'Onboarding'),
    Profile_Building: students.filter((s) => s.phase === 'Profile_Building'),
    College_Applications: students.filter((s) => s.phase === 'College_Applications'),
  };

  // Logic for flagging students ready for College Applications:
  // May (month 4, 0-indexed) or later in the year BEFORE graduation.
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const phaseChangeAlerts = [
    ...studentsByPhase.Onboarding
      .filter(s => s.profileCompletionPct >= 95)
      .map(s => ({
        studentId: s.userId,
        name: `${s.user.firstName} ${s.user.lastName}`,
        message: `Profile ${s.profileCompletionPct}% complete. Review for Profile Building phase.`,
        type: 'approval'
      })),
    ...studentsByPhase.Profile_Building
      .filter(s => {
        // If they are in 12th grade already, they should definitely move
        if (s.currentGrade === 'twelfth') return true;
        
        // If it's April or later (month >= 3), and they graduate next year, they are "rising seniors"
        if (currentMonth >= 3 && s.graduationYear === currentYear + 1) return true;

        return false;
      })
      .map(s => ({
        studentId: s.userId,
        name: `${s.user.firstName} ${s.user.lastName}`,
        message: `Ready for College Applications (Graduating ${s.graduationYear}).`,
        type: 'milestone'
      }))
  ];

  const caseloadHealthPct = students.length > 0 
    ? Math.round((students.filter(s => s.profileCompletionPct >= 80).length / students.length) * 100) 
    : 0;

  const renderStudentTable = (title: string, studentList: typeof students) => (
    <Card className="mb-8" variant="base">
      <CardHeader>
        <CardTitle className={ux.text.subheading}>{title} ({studentList.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {studentList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Grade</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Curriculum</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Profile</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {studentList.map((student) => (
                  <tr key={student.userId} className="hover:bg-surface-soft transition-colors">
                    <td className="px-4 py-3 text-sm font-bold text-slate-900">
                      {student.user.firstName} {student.user.lastName}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 font-medium">
                      {student.user.email}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant="neutral">{student.currentGrade}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 font-medium">
                      {(() => {
                        const derived = getDerivedCurriculum(student);
                        return derived ? (
                          <div className="flex flex-col">
                            <span>{derived.curriculumType}</span>
                            {derived.curriculumType === 'Other' && derived.otherName && (
                              <span className="text-[10px] text-slate-400">({derived.otherName})</span>
                            )}
                          </div>
                        ) : '-';
                      })()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5">
                          <div
                            className="bg-brand-500 h-1.5 rounded-full"
                            style={{ width: `${student.profileCompletionPct || 0}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-slate-400">
                          {student.profileCompletionPct || 0}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Link
                        href={`/counselor/students/${student.userId}`}
                        className="text-brand-600 hover:text-brand-700 font-bold text-xs uppercase tracking-tight"
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-400 text-center py-12 italic">No students in this phase.</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className={ux.layout.page}>
      <div className={ux.layout.header}>
        <h1 className={ux.text.heading}>
          {roleTitle} Dashboard
        </h1>
        <p className={ux.text.body}>
          Manage your caseload and track student progress across lifecycle phases.
        </p>
      </div>

      {/* Alerts Section */}
      {phaseChangeAlerts.length > 0 && (
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-800 text-sm flex items-center gap-2">
              <span className="text-lg">🔔</span> Action Required: Phase Transitions ({phaseChangeAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {phaseChangeAlerts.map((alert, idx) => (
                <Link key={idx} href={alert.href || `/counselor/students/${alert.studentId}`} className="block">
                  <div className={cn(
                    "p-3 bg-white border rounded-lg transition-all shadow-sm",
                    alert.type === 'intelligence' ? "border-brand-100 hover:border-brand-300" : "border-amber-100 hover:border-amber-300"
                  )}>
                    <p className="font-bold text-slate-900 text-sm">{alert.name}</p>
                    <p className="text-xs text-slate-600 mt-1">{alert.message}</p>
                    <p className={cn(
                      "text-[10px] font-black uppercase mt-2",
                      alert.type === 'intelligence' ? "text-brand-600" : "text-amber-600"
                    )}>
                      Review & Approve &rarr;
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      {featureFlags.counselorDashboard.stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card variant="pop" className={ux.card.highlight}>
            <CardContent className="pt-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className={ux.text.accent}>Caseload Overview</p>
                  <div className="flex items-baseline gap-4 mt-2">
                    <span className="text-5xl font-black text-slate-900">{students.length}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Students</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5 max-w-[100px]">
                      <div 
                        className="bg-green-500 h-1.5 rounded-full" 
                        style={{ width: `${caseloadHealthPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-black text-slate-500">{caseloadHealthPct}% Healthy</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center">
                  <span className="text-4xl">👥</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Link href="/counselor/meetings" className="block group">
            <Card variant="pop" className="group-hover:border-brand-300 transition-all">
              <CardContent className="pt-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className={ux.text.accent}>Pending Meetings</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-5xl font-black text-slate-900">{pendingRequestsCount}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Requests</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                    <span className="text-3xl text-amber-600">🗓️</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="neutral" className="bg-slate-100">{upcomingMeetingsCount} upcoming</Badge>
                  <span className="text-[10px] font-bold text-brand-600 uppercase ml-auto group-hover:underline tracking-tight">Manage &rarr;</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card variant="pop" className={cn(phaseChangeAlerts.length > 0 ? "border-amber-200 bg-amber-50/30" : "")}>
            <CardContent className="pt-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className={cn(ux.text.accent, phaseChangeAlerts.length > 0 ? "text-amber-700" : "")}>Phase Transitions</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className={cn("text-5xl font-black", phaseChangeAlerts.length > 0 ? "text-amber-600" : "text-slate-900")}>
                      {phaseChangeAlerts.length}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-nowrap">Ready for review</span>
                  </div>
                </div>
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", phaseChangeAlerts.length > 0 ? "bg-amber-100" : "bg-slate-50")}>
                  <span className="text-3xl">{phaseChangeAlerts.length > 0 ? "🔔" : "✨"}</span>
                </div>
              </div>
              <div className="mt-4">
                 <span className="text-[10px] font-bold text-slate-500 uppercase">
                   {phaseChangeAlerts.length > 0 ? "Approval Required" : "All students on track"}
                 </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Pipeline */}
      {featureFlags.counselorDashboard.studentsList ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className={ux.text.accent}>Student Management Pipeline</h2>
          </div>
          {renderStudentTable('Onboarding Phase', studentsByPhase.Onboarding)}
          {renderStudentTable('Profile Building Phase', studentsByPhase.Profile_Building)}
          {renderStudentTable('College Applications Phase', studentsByPhase.College_Applications)}
        </div>
      ) : (
        <Card variant="base" className="bg-surface-soft border-dashed border-2 py-24 text-center">
          <p className={ux.text.body}>Pipeline view is currently disabled.</p>
        </Card>
      )}
    </div>
  );
}
