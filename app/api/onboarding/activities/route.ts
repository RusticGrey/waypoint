import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { activitySchema } from '@/lib/validations/activity';
import { z } from 'zod';
import { ActivityCategory, GradeLevel } from '@prisma/client';
import { calculateProfileCompletion } from '@/lib/utils/profile-completion';
import { updateStudentProfileCompletion } from '@/lib/api-helpers/profile';

const activitiesArraySchema = z.object({
  activities: z.array(activitySchema),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { activities } = activitiesArraySchema.parse(body);

    // Delete existing activities and create new ones
    await prisma.activity.deleteMany({
      where: { studentId: session.user.id },
    });

    const createdActivities = await prisma.activity.createMany({
      data: activities.map((activity) => {
        // Convert gradeLevels array to single gradeLevel (use the highest/latest grade)
        const { gradeLevels, ...activityData } = activity;
        const gradeLevel = gradeLevels && gradeLevels.length > 0
          ? gradeLevels[gradeLevels.length - 1] // Use the highest grade
          : GradeLevel.ninth; // fallback
        
        return {
          ...activityData,
          category: activityData.category as ActivityCategory,
          gradeLevel: gradeLevel as GradeLevel,
          studentId: session.user.id,
        };
      }),
    });

    // Update profile completion percentage
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      include: {
        personalProfile: true,
        academicProfile: true,
        transcripts: true,
        activities: true,
        achievements: true,
        projectExperiences: true,
        testScores: true,
      },
    });

    let completionPercentage = 0;
    if (student) {
      const { percentage } = calculateProfileCompletion(student);
      completionPercentage = percentage;
      await updateStudentProfileCompletion(session.user.id, percentage);
    }

    return NextResponse.json({ data: createdActivities, completionPercentage });
  } catch (error) {
    console.error('Activities error:', error);
    return NextResponse.json(
      { error: 'Failed to save activities' },
      { status: 500 }
    );
  }
}
