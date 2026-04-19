import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ux } from '@/lib/ux';
import { getDerivedCurriculum } from '@/lib/api-helpers/profile';

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
    where: { userId: session.user.id },
    include: {
      personalProfile: true,
      transcripts: {
        orderBy: [
          { gradeLevel: 'asc' },
          { courseName: 'asc' }
        ]
      },
      activities: {
        orderBy: {
          activityName: 'asc'
        }
      },
      achievements: {
        orderBy: {
          gradeLevel: 'asc'
        }
      },
      projectExperiences: {
        orderBy: {
          startDate: 'desc'
        }
      },
    },
  });

  if (!student) {
    redirect('/student/onboarding');
  }

  return (
    <div className={ux.layout.page}>
      <div className={ux.layout.header}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className={ux.text.heading}>My Complete Profile</h1>
            <p className={ux.text.body}>Review your academic and personal background</p>
          </div>
          <Link
            href="/student"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>
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
                <dd className="mt-1 text-sm text-gray-900">{student.personalProfile?.phone || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Current School</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.personalProfile?.currentSchool}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Current Grade</dt>
                <dd className="mt-1 text-sm text-gray-900">{gradeLabels[student.currentGrade]}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Expected Graduation</dt>
                <dd className="mt-1 text-sm text-gray-900">{student.graduationYear}</dd>
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
              <div className="space-y-8">
                {['ninth', 'tenth', 'eleventh', 'twelfth'].map((grade) => {
                  const gradeTranscripts = student.transcripts.filter((t: any) => t.gradeLevel === grade);
                  if (gradeTranscripts.length === 0) return null;

                  return (
                    <div key={grade} className="space-y-3">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <h4 className="text-sm font-black text-slate-700 uppercase tracking-tight">
                          {gradeLabels[grade]}
                        </h4>
                        <div className="flex gap-4">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Curriculum: <span className="text-brand-600">
                              {(gradeTranscripts[0] as any).curriculumType}
                              {(gradeTranscripts[0] as any).curriculumType === 'Other' && (gradeTranscripts[0] as any).otherCurriculumName && ` (${(gradeTranscripts[0] as any).otherCurriculumName})`}
                            </span>
                          </span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Scale: <span className="text-brand-600">{(gradeTranscripts[0] as any).gradingSystemType?.replace(/_/g, ' ')}</span>
                          </span>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {gradeTranscripts.map((transcript: any) => (
                              <tr key={transcript.id}>
                                <td className="px-4 py-3 text-sm text-gray-900">{transcript.courseName}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{transcript.semester.replace('_', ' ')}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{transcript.gradeValue}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{transcript.honorsLevel.replace('_', ' ')}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
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
                        <h4 className="text-base font-semibold text-gray-900">{activity.activityName}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.category}
                          {activity.role && ` • ${activity.role}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {activity.hoursPerWeek}h/week × {activity.weeksPerYear} weeks
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.hoursPerWeek * activity.weeksPerYear} total hours
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
                      {achievement.achievementType.replace('_', ' ')}
                      {achievement.organization && ` • ${achievement.organization}`}
                      {achievement.recognitionLevel && ` • ${achievement.recognitionLevel} Level`}
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
              <CardTitle>Projects & Experiences ({student.projectExperiences?.length || 0})</CardTitle>
              <Link
                href="/student/edit/projects"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Edit →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {student.projectExperiences && student.projectExperiences.length > 0 ? (
              <div className="space-y-4">
                {student.projectExperiences.map((project) => (
                  <div key={project.id} className="border-b pb-4 last:border-0">
                    <h4 className="text-base font-semibold text-gray-900">{project.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {project.experienceType.replace('_', ' ')}
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
