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
        academicProfile: true,
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
                      {student.academicProfile?.curriculumType || '-'}
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

      {/* Stats Cards */}
      {featureFlags.counselorDashboard.stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card variant="pop" className={ux.card.highlight}>
            <CardContent className="pt-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className={ux.text.accent}>Caseload Size</p>
                  <p className="text-5xl font-black text-slate-900 mt-2">{students.length}</p>
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
                  <Badge variant="neutral" className="bg-slate-100">{upcomingMeetingsCount} upcoming sessions</Badge>
                  <span className="text-[10px] font-bold text-brand-600 uppercase ml-auto group-hover:underline">Manage &rarr;</span>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card variant="pop">
            <CardContent className="pt-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className={ux.text.accent}>Caseload Health</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-5xl font-black text-slate-900">
                      {students.length > 0 ? Math.round((students.filter(s => s.profileCompletionPct >= 80).length / students.length) * 100) : 0}%
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Complete</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center">
                  <span className="text-4xl text-green-600">✓</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                 <span className="text-[10px] font-bold text-red-500 uppercase">{students.filter((s) => s.profileCompletionPct < 50).length} Need Attention</span>
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
