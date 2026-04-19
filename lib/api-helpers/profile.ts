import { prisma } from '@/lib/prisma';

export async function updateStudentProfileCompletion(
  studentId: string,
  profileCompletionPercentage: number
) {
  console.log(`Updating profile completion for studentId ${studentId} to ${profileCompletionPercentage}%`);
  try {
    // If completion is 100%, also move to Profile_Building phase if currently in Onboarding
    const updateData: any = { profileCompletionPct: profileCompletionPercentage };
    
    // NOTE: Auto-advance disabled. Counselors must now manually approve transition from Onboarding to Profile Building.
    /*
    if (profileCompletionPercentage === 100) {
      const currentStudent = await prisma.student.findUnique({
        where: { userId: studentId },
        select: { phase: true }
      });
      
      if (currentStudent?.phase === 'Onboarding') {
        updateData.phase = 'Profile_Building';
      }
    }
    */

    return await prisma.student.update({
      where: { userId: studentId },
      data: updateData,
    });
  } catch (error) {
    console.error('Failed to update profile completion:', error);
    throw error;
  }
}

export async function isNewStudent(userId: string): Promise<boolean> {
  try {
    const student = await prisma.student.findUnique({
      where: { userId },
      select: {
        userId: true,
        profileCompletionPct: true,
        phase: true,
      },
    });

    // If no student record exists or phase is Onboarding, consider it a new student
    const isNew = !student || student.phase === 'Onboarding';
    console.log(`isNewStudent check for userId ${userId}:`, { student, isNew });
    return isNew;
  } catch (error) {
    console.error('Failed to check if new student:', error);
    throw error;
  }
}

export async function getStudentPhase(userId: string) {
  try {
    const student = await prisma.student.findUnique({
      where: { userId },
      select: { phase: true },
    });
    return student?.phase || 'Onboarding';
  } catch (error) {
    console.error('Failed to get student phase:', error);
    throw error;
  }
}

export async function updateStudentPhase(userId: string, phase: 'Onboarding' | 'Profile_Building' | 'College_Applications') {
  try {
    return await prisma.student.update({
      where: { userId },
      data: { phase },
    });
  } catch (error) {
    console.error('Failed to update student phase:', error);
    throw error;
  }
}

/**
 * Derives the graduating curriculum from the highest grade level transcripts.
 */
export function getDerivedCurriculum(student: any): { curriculumType: string; otherName?: string } | null {
  if (!student.transcripts || student.transcripts.length === 0) return null;

  const gradeWeights: Record<string, number> = {
    twelfth: 4,
    eleventh: 3,
    tenth: 2,
    ninth: 1,
  };

  // Sort transcripts by grade level weight descending
  const sortedTranscripts = [...student.transcripts].sort((a, b) => {
    return (gradeWeights[b.gradeLevel] || 0) - (gradeWeights[a.gradeLevel] || 0);
  });

  const bestTranscript = sortedTranscripts.find(t => t.curriculumType);
  if (!bestTranscript) return null;

  return {
    curriculumType: bestTranscript.curriculumType,
    otherName: bestTranscript.otherCurriculumName
  };
}
