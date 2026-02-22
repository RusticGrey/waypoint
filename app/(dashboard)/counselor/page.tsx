import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { FeatureOverview } from '@/components/dashboard/FeatureOverview';

export default async function CounselorDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  if (session.user.role !== 'counselor') {
    redirect('/');
  }

  // Get all students in the organization
  const students = await prisma.student.findMany({
    where: {
      user: {
        organizationId: session.user.organizationId,
      },
    },
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

  const studentsByPhase = {
    Onboarding: students.filter((s) => s.phase === 'Onboarding'),
    Profile_Building: students.filter((s) => s.phase === 'Profile_Building'),
    College_Applications: students.filter((s) => s.phase === 'College_Applications'),
  };

  const renderStudentTable = (title: string, studentList: typeof students) => (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{title} ({studentList.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {studentList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Curriculum</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profile</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentList.map((student) => (
                  <tr key={student.userId}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {student.user.firstName} {student.user.lastName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {student.user.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {student.currentGrade}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {student.academicProfile?.curriculumType || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${student.profileCompletionPct || 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          {student.profileCompletionPct || 0}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Link
                        href={`/counselor/students/${student.userId}`}
                        className="text-blue-600 hover:text-blue-700"
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
          <p className="text-gray-500 text-center py-8">No students in this phase.</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Counselor Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Welcome back, {session.user.name}!
        </p>
      </div>

      <FeatureOverview role="counselor" />

      {/* Meeting Management Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/counselor/meetings" className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-3">
          <span className="text-2xl group-hover:scale-110 transition-transform">🗓️</span>
          <div>
            <span className="font-bold text-black block">Manage Meetings</span>
            <span className="text-xs text-gray-500">View calendar and requests</span>
          </div>
        </Link>
        <Link href="/counselor/meetings/availability" className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-3">
          <span className="text-2xl group-hover:scale-110 transition-transform">⏰</span>
          <div>
            <span className="font-bold text-black block">Set Availability</span>
            <span className="text-xs text-gray-500">Define your working hours</span>
          </div>
        </Link>
        <Link href="/counselor/profile" className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-3">
          <span className="text-2xl group-hover:scale-110 transition-transform">⚙️</span>
          <div>
            <span className="font-bold text-black block">Setup & Profile</span>
            <span className="text-xs text-gray-500">Manage integrations</span>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{students.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Profiles Complete</p>
                <p className="text-3xl font-bold text-gray-900">
                  {students.filter(s => s.profileCompletionPct >= 80).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Needs Attention</p>
                <p className="text-3xl font-bold text-gray-900">
                  {students.filter(s => s.profileCompletionPct < 50).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {renderStudentTable('Onboarding Phase', studentsByPhase.Onboarding)}
      {renderStudentTable('Profile Building Phase', studentsByPhase.Profile_Building)}
      {renderStudentTable('College Applications Phase', studentsByPhase.College_Applications)}

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link
                href="/admin/subjects"
                className="block px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
              >
                <p className="font-medium text-blue-900">Manage Course List</p>
                <p className="text-sm text-blue-700">Add or edit courses for each curriculum</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
