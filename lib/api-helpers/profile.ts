import { prisma } from '@/lib/prisma';

export async function updateStudentProfileCompletion(
  studentId: string,
  profileCompletionPercentage: number
) {
  console.log(`Updating profile completion for studentId ${studentId} to ${profileCompletionPercentage}%`);
  try {
    return await prisma.student.update({
      where: { userId: studentId },
      data: { profileCompletionPct: profileCompletionPercentage },
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
      },
    });

    // If no student record exists or profile completion is less than 100%, consider it a new student
    const isNew = !student || !student.profileCompletionPct || student.profileCompletionPct < 100;
    console.log(`isNewStudent check for userId ${userId}:`, { student, isNew });
    return isNew;
  } catch (error) {
    console.error('Failed to check if new student:', error);
    throw error;
  }
}
