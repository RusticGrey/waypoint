import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const gradeLabels: Record<string, string> = {
  ninth: '9th Grade',
  tenth: '10th Grade',
  eleventh: '11th Grade',
  twelfth: '12th Grade',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const student = await prisma.student.findUnique({
    where: { user_id: session.user.id },
    include: {
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
    },
  });

  if (!student) {
    redirect('/student/onboarding');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Complete Profile</h1>
        <Link
          href="/student"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Personal Information</CardTitle>
              <Link
                href="/student/edit/personal"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Edit →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{session.user.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{session.user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.personal_profile?.phone || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Current School</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.personal_profile?.current_school}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Current Grade</dt>
                <dd className="mt-1 text-sm text-gray-900">{gradeLabels[student.current_grade]}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Expected Graduation</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.graduation_year}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Academic Background */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Academic Background</CardTitle>
              <Link
                href="/student/edit/academic"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Edit →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Curriculum</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.academic_profile?.curriculum_type}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Grading System</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {student.academic_profile?.grading_system_type.replace(/_/g, ' ')}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Current GPA/CGPA</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.academic_profile?.current_gpa || '-'}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Transcripts */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Academic Transcripts ({student.transcripts.length} courses)</CardTitle>
              <Link
                href="/student/edit/transcripts"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Edit →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {student.transcripts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade Level</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {student.transcripts.map((transcript) => (
                      <tr key={transcript.id}>
                        <td className="px-4 py-3 text-sm text-gray-900">{transcript.course_name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {gradeLabels[transcript.grade_level]}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{transcript.semester}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{transcript.grade_value}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{transcript.honors_level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No courses added yet</p>
            )}
          </CardContent>
        </Card>

        {/* Activities */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Activities & Extracurriculars ({student.activities?.length || 0})</CardTitle>
              <Link
                href="/student/edit/activities"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Edit →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {student.activities && student.activities.length > 0 ? (
              <div className="space-y-4">
                {student.activities.map((activity) => (
                  <div key={activity.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-gray-900">{activity.activity_name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.category}
                          {activity.role && ` • ${activity.role}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {activity.hours_per_week}h/week × {activity.weeks_per_year} weeks
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.hours_per_week * activity.weeks_per_year} total hours
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{activity.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No activities added yet</p>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Achievements & Honors ({student.achievements?.length || 0})</CardTitle>
              <Link
                href="/student/edit/achievements"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Edit →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {student.achievements && student.achievements.length > 0 ? (
              <div className="space-y-4">
                {student.achievements.map((achievement) => (
                  <div key={achievement.id} className="border-b pb-4 last:border-0">
                    <h4 className="text-base font-semibold text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {achievement.achievement_type.replace('_', ' ')}
                      {achievement.organization && ` • ${achievement.organization}`}
                      {achievement.recognition_level && ` • ${achievement.recognition_level} Level`}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">{achievement.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No achievements added yet</p>
            )}
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Projects & Experiences ({student.project_experiences?.length || 0})</CardTitle>
              <Link
                href="/student/edit/projects"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Edit →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {student.project_experiences && student.project_experiences.length > 0 ? (
              <div className="space-y-4">
                {student.project_experiences.map((project) => (
                  <div key={project.id} className="border-b pb-4 last:border-0">
                    <h4 className="text-base font-semibold text-gray-900">{project.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {project.experience_type.replace('_', ' ')}
                      {project.organization && ` • ${project.organization}`}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">{project.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No projects added yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
