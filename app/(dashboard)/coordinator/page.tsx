import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default async function CoordinatorDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  if (session.user.role !== 'coordinator' && session.user.role !== 'counselor') {
    redirect('/student');
  }

  // Get students assigned to this coordinator
  const students = await prisma.Student.findMany({
    where: {
      coordinatorId: session.user.id,
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
      achievements: true,
      projectExperiences: true,
      targetColleges: {
        include: {
          college: true,
        },
      },
      meetings: {
        orderBy: {
          meetingDate: 'desc',
        },
        take: 1, // Get last meeting
      },
    },
    orderBy: {
      user: {
        lastName: 'asc',
      },
    },
  });

  // Calculate stats
  const totalStudents = students.length;
  const completedProfiles = students.filter(s => s.profileCompletionPct >= 80).length;
  const needsAttention = students.filter(s => s.profileCompletionPct < 50).length;
  const recentMeetings = students.filter(s => {
    if (s.meetings.length === 0) return false;
    const lastMeeting = new Date(s.meetings[0].meetingDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return lastMeeting >= weekAgo;
  }).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Coordinator Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Welcome back, {session.user.name}!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Students</p>
                <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
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
                <p className="text-3xl font-bold text-gray-900">{completedProfiles}</p>
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
                <p className="text-3xl font-bold text-gray-900">{needsAttention}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Meetings (7d)</p>
                <p className="text-3xl font-bold text-gray-900">{recentMeetings}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>My Students</CardTitle>
        </CardHeader>
        <CardContent>
          {students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profile</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Colleges</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Meeting</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.userId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {student.user.firstName} {student.user.lastName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {student.user.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {student.currentGrade}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                student.profileCompletionPct >= 80 ? 'bg-green-600' :
                                student.profileCompletionPct >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                              }`}
                              style={{ width: `${student.profileCompletionPct || 0}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">
                            {student.profileCompletionPct || 0}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {student.targetColleges?.length || 0}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {student.meetings[0] 
                          ? new Date(student.meetings[0].meetingDate).toLocaleDateString()
                          : 'Never'
                        }
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Link
                          href={`/coordinator/students/${student.userId}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
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
            <p className="text-gray-500 text-center py-8">
              No students assigned yet. Contact your counselor to get started.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
