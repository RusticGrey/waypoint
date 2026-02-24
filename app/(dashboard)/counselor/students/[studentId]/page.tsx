import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect, notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { analyzeProfileStrength } from '@/lib/utils/profile-strength';
import Link from 'next/link';
import StudentFullProfile from '@/components/dashboard/StudentFullProfile';
import { PhaseControl } from './phase-control';

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

  if (session.user.role !== 'counselor' && session.user.role !== 'counselor') {
    redirect('/');
  }

  const isCounselor = session.user.role === 'counselor';

  const student = await prisma.student.findUnique({
    where: { userId: params.studentId },
    include: {
      user: true,
      counselor: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      personalProfile: true,
      academicProfile: true,
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
      testScores: true,
      targetColleges: {
        include: {
          college: true,
        },
        orderBy: {
          targetCategory: 'asc',
        },
      },
      goals: {
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
          counselor: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: {
          meetingDate: 'desc',
        },
        take: 5,
      },
    },
  });

  if (!student) {
    notFound();
  }

  // Permission check for counselors
  if (isCounselor && student.counselorId !== session.user.id) {
    redirect('/counselor');
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
            {student.user.firstName} {student.user.lastName}
          </h1>
          <p className="text-gray-600 mt-1">{student.user.email}</p>
          {student.counselor && (
            <p className="text-sm text-gray-500 mt-1">
              Counselor: {student.counselor.firstName} {student.counselor.lastName}
            </p>
          )}
        </div>
      </div>

      <PhaseControl studentId={student.userId} currentPhase={student.phase} />

      {/* Profile Strength */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile Strength Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <div className={`text-6xl font-bold ${
                analysis.overallScore >= 80 ? 'text-green-600' :
                analysis.overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {analysis.overallScore}
              </div>
              <p className="text-sm text-gray-500 text-center">/ 100</p>
            </div>
            <div className="flex-1">
              <ProgressBar percentage={analysis.overallScore} showLabel={false} />
              <p className="mt-2 text-sm font-medium text-gray-900">
                College Readiness: <span className={
                  analysis.collegeReadiness === 'Highly Competitive' ? 'text-green-600' :
                  analysis.collegeReadiness === 'Competitive' ? 'text-blue-600' :
                  analysis.collegeReadiness === 'Developing' ? 'text-yellow-600' : 'text-red-600'
                }>{analysis.collegeReadiness}</span>
              </p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
            {Object.entries(analysis.categoryScores).map(([category, score]) => (
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

      <div className="mb-6">
        <StudentFullProfile student={student} analysis={analysis} />
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
