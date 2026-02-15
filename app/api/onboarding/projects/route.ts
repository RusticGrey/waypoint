import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { projectSchema } from '@/lib/validations/activity';
import { z } from 'zod';
import { calculateProfileCompletion } from '@/lib/utils/profile-completion';
import { updateStudentProfileCompletion } from '@/lib/api-helpers/profile';

const projectsArraySchema = z.object({
  projects: z.array(projectSchema),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { projects } = projectsArraySchema.parse(body);

    await prisma.projectExperience.deleteMany({
      where: { studentId: session.user.id },
    });

    if (projects.length > 0) {
      const createdProjects = await prisma.projectExperience.createMany({
        data: projects.map((project) => ({
          title: project.title,
          experienceType: project.experienceType,
          organization: project.organization,
          roleTitle: project.roleTitle,
          startDate: project.startDate ? new Date(project.startDate) : new Date(),
          endDate: project.endDate ? new Date(project.endDate) : null,
          isOngoing: project.isOngoing,
          description: project.description,
          studentId: session.user.id,
        })),
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

      return NextResponse.json({ data: createdProjects, completionPercentage });
    }

    // Update profile completion percentage even if no projects
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

    return NextResponse.json({ success: true, completionPercentage });
  } catch (error) {
    console.error('Projects error:', error);
    return NextResponse.json(
      { error: 'Failed to save projects' },
      { status: 500 }
    );
  }
}
