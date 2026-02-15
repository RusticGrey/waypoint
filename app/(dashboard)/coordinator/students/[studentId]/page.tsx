import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { analyzeProfileStrength } from '@/lib/utils/profile-strength';
import Link from 'next/link';
import OverrideButton from './override-button';
import StudentFullProfile from '@/components/dashboard/StudentFullProfile';

const gradeLabels: Record<string, string> = {
  ninth: '9th Grade',
  tenth: '10th Grade',
  eleventh: '11th Grade',
  twelfth: '12th Grade',
};

export default async function StudentProfileViewer({
  params,
}: {
  params: { studentId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  if (session.user.role !== 'coordinator' && session.user.role !== 'counselor') {
    redirect('/student');
  }

  const student = await prisma.student.findUnique({
    where: { userId: params.studentId },
    include: {
      user: true,
      personalProfile: true,
      academicProfile: true,
      transcripts: true,
      activities: true,
      achievements: true,
      projectExperiences: true,
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
        orderBy: {
          meetingDate: 'desc',
        },
        take: 5,
      },
      profileOverride: {
        include: {
          coordinator: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  if (!student) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <p className="text-gray-600">Student not found</p>
          <Link href="/coordinator" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Check if this coordinator has access to this student
  if (session.user.role === 'coordinator' && student.coordinatorId !== session.user.id) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <p className="text-gray-600">You don't have access to this student's profile</p>
          <Link href="/coordinator" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const analysis = analyzeProfileStrength(student);
  
  const displayScore = student.profileOverride 
    ? student.profileOverride.overrideScore 
    : analysis.overallScore;
  
  const isOverridden = !!student.profileOverride;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link href="/coordinator" className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {student.user.firstName} {student.user.lastName}
          </h1>
          <p className="text-gray-600 mt-1">{student.user.email}</p>
        </div>
        <Link
          href={`/coordinator/meetings/new?student=${params.studentId}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Log Meeting
        </Link>
      </div>

      {/* Profile Strength */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Profile Strength Score</CardTitle>
            <OverrideButton 
              studentId={params.studentId}
              currentScore={analysis.overallScore}
              existingOverride={student.profileOverride}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 text-center">
              <div className={`text-6xl font-bold ${
                displayScore >= 80 ? 'text-green-600' :
                displayScore >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {displayScore}
              </div>
              <p className="text-sm text-gray-500 mt-1">/ 100</p>
              {isOverridden && (
                <div className="mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  Counselor Adjusted
                </div>
              )}
            </div>
            <div className="flex-1">
              <ProgressBar percentage={displayScore} showLabel={false} />
              <p className="mt-2 text-sm font-medium text-gray-900">
                College Readiness: <span className={
                  analysis.collegeReadiness === 'Highly Competitive' ? 'text-green-600' :
                  analysis.collegeReadiness === 'Competitive' ? 'text-blue-600' :
                  analysis.collegeReadiness === 'Developing' ? 'text-yellow-600' : 'text-red-600'
                }>{analysis.collegeReadiness}</span>
              </p>
              
              {isOverridden && student.profileOverride && student.profileOverride.coordinator && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-xs font-medium text-blue-900">
                    Original Score: {analysis.overallScore}/100
                  </p>
                  <p className="text-xs text-blue-800 mt-1">
                    <strong>Override Reason:</strong> {student.profileOverride.overrideReason}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    By {student.profileOverride.coordinator.firstName} {student.profileOverride.coordinator.lastName} on {new Date(student.profileOverride.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
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

      <StudentFullProfile student={student} analysis={analysis} />
    </div>
  );
}
