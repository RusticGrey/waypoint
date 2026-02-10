import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { analyzeProfileStrength } from '@/lib/utils/profile-strength';
import Link from 'next/link';

const gradeLabels: Record<string, string> = {
  ninth: '9th Grade',
  tenth: '10th Grade',
  eleventh: '11th Grade',
  twelfth: '12th Grade',
};

export default async function CounselorStudentViewer({
  params,
}: {
  params: { studentId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  if (session.user.role !== 'counselor') {
    redirect('/coordinator');
  }

  const student = await prisma.student.findUnique({
    where: { user_id: params.studentId },
    include: {
      user: true,
      coordinator: {
        select: {
          first_name: true,
          last_name: true,
          email: true,
        },
      },
      personal_profile: true,
      academic_profile: true,
      transcripts: {
        orderBy: [
          { grade_level: 'asc' },
          { course_name: 'asc' }
        ]
      },
      activities: {
        orderBy: {
          activity_name: 'asc'
        }
      },
      achievements: {
        orderBy: {
          grade_level: 'asc'
        }
      },
      project_experiences: {
        orderBy: {
          start_date: 'desc'
        }
      },
      test_scores: true,
      target_colleges: {
        include: {
          college: true,
        },
        orderBy: {
          category: 'asc',
        },
      },
      profile_goals: {
        where: {
          status: {
            in: ['Not_Started', 'In_Progress'],
          },
        },
        orderBy: {
          priority: 'desc',
        },
      },
      meetings: {
        include: {
          coordinator: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
        orderBy: {
          meeting_date: 'desc',
        },
        take: 5,
      },
    },
  });

  if (!student) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <p className="text-gray-600">Student not found</p>
          <Link href="/counselor" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const analysis = analyzeProfileStrength(student);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link href="/counselor" className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {student.user.first_name} {student.user.last_name}
          </h1>
          <p className="text-gray-600 mt-1">{student.user.email}</p>
          {student.coordinator && (
            <p className="text-sm text-gray-500 mt-1">
              Coordinator: {student.coordinator.first_name} {student.coordinator.last_name}
            </p>
          )}
        </div>
      </div>

      {/* Profile Strength */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile Strength Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <div className={`text-6xl font-bold ${
                analysis.overall_score >= 80 ? 'text-green-600' :
                analysis.overall_score >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {analysis.overall_score}
              </div>
              <p className="text-sm text-gray-500 text-center">/ 100</p>
            </div>
            <div className="flex-1">
              <ProgressBar percentage={analysis.overall_score} showLabel={false} />
              <p className="mt-2 text-sm font-medium text-gray-900">
                College Readiness: <span className={
                  analysis.college_readiness === 'Highly Competitive' ? 'text-green-600' :
                  analysis.college_readiness === 'Competitive' ? 'text-blue-600' :
                  analysis.college_readiness === 'Developing' ? 'text-yellow-600' : 'text-red-600'
                }>{analysis.college_readiness}</span>
              </p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
            {Object.entries(analysis.category_scores).map(([category, score]) => (
              <div key={category}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700 capitalize">
                    {category}
                  </span>
                  <span className={`text-xs font-bold ${
                    score >= 80 ? 'text-green-600' :
                    score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {score}
                  </span>
                </div>
                <ProgressBar percentage={score} showLabel={false} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Target Colleges</p>
            <p className="text-3xl font-bold text-gray-900">{student.target_colleges?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Activities</p>
            <p className="text-3xl font-bold text-gray-900">{student.activities?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Achievements</p>
            <p className="text-3xl font-bold text-gray-900">{student.achievements?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Active Goals</p>
            <p className="text-3xl font-bold text-gray-900">{student.profile_goals?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">School</dt>
                <dd className="text-sm font-medium text-gray-900">{student.personal_profile?.current_school || 'Not set'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Location</dt>
                <dd className="text-sm font-medium text-gray-900">{student.personal_profile?.school_location || 'Not set'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Current Grade</dt>
                <dd className="text-sm font-medium text-gray-900">{gradeLabels[student.current_grade]}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Graduation Year</dt>
                <dd className="text-sm font-medium text-gray-900">{student.graduation_year}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Curriculum</dt>
                <dd className="text-sm font-medium text-gray-900">{student.academic_profile?.curriculum_type || 'Not set'}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Active Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Active Goals ({student.profile_goals?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {student.profile_goals && student.profile_goals.length > 0 ? (
              <div className="space-y-3">
                {student.profile_goals.map((goal) => (
                  <div key={goal.id} className="border-l-4 border-blue-500 pl-3 py-2">
                    <p className="text-sm font-semibold text-gray-900">{goal.category}</p>
                    <p className="text-xs text-gray-600">Target: {goal.target_value}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      goal.status === 'In_Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {goal.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No active goals</p>
            )}
          </CardContent>
        </Card>

        {/* Target Colleges */}
        <Card>
          <CardHeader>
            <CardTitle>Target Colleges ({student.target_colleges?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {student.target_colleges && student.target_colleges.length > 0 ? (
              <div className="space-y-2">
                {student.target_colleges.slice(0, 5).map((tc) => (
                  <div key={tc.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm text-gray-900">{tc.college.name}</span>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      tc.category === 'Reach' ? 'bg-red-100 text-red-800' :
                      tc.category === 'Match' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {tc.category}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No colleges added yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            {student.meetings && student.meetings.length > 0 ? (
              <div className="space-y-3">
                {student.meetings.map((meeting) => (
                  <div key={meeting.id} className="border-b pb-3 last:border-0">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(meeting.meeting_date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-gray-600">
                      {meeting.meeting_type.replace('_', ' ')}
                      {meeting.coordinator && ` with ${meeting.coordinator.first_name} ${meeting.coordinator.last_name}`}
                    </p>
                    {meeting.notes && (
                      <p className="text-xs text-gray-700 mt-1">{meeting.notes.substring(0, 100)}...</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No meetings logged yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recommendations for Student</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysis.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-blue-600 font-bold mr-3">{idx + 1}.</span>
                  <p className="text-sm text-gray-900">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
