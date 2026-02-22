import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import StudentFullProfile from '@/components/dashboard/StudentFullProfile';
import { analyzeProfileStrength } from '@/lib/utils/profile-strength';

export default async function CoordinatorStudentDetailPage({ params }: { params: { studentId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const student = await prisma.student.findUnique({
    where: { userId: params.studentId },
    include: {
      user: true,
      personalProfile: true,
      academicProfile: true,
      transcripts: true,
      testScores: true,
      activities: true,
      achievements: true,
      projectExperiences: true,
      applications: {
        include: {
          college: true
        }
      },
      targetColleges: {
        include: {
          college: true
        }
      },
      goals: true,
      meetings: {
        include: {
          user: true
        },
        orderBy: {
          meetingDate: 'desc'
        }
      },
      profileOverride: true
    },
  });

  if (!student) {
    return <div>Student not found</div>;
  }

  // Verify coordinator access
  if (student.coordinatorId !== session.user.id && session.user.role !== 'counselor') {
    return <div>Access denied</div>;
  }

  const analysis = analyzeProfileStrength(student as any); // Cast to any to bypass strict type check for now, as we know the structure matches what's needed

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {student.user.firstName} {student.user.lastName}
          </h1>
          <p className="text-gray-500">
            {student.user.email} • Grade {student.currentGrade}
          </p>
        </div>
        <Link href="/coordinator/students">
          <Button variant="outline">← Back to List</Button>
        </Link>
      </div>

      <StudentFullProfile student={student} analysis={analysis} />
    </div>
  );
}
