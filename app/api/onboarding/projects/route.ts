import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { projectSchema } from '@/lib/validations/activity';
import { z } from 'zod';

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

    await prisma.ProjectExperience.deleteMany({
      where: { studentId: session.user.id },
    });

    if (projects.length > 0) {
      const createdProjects = await prisma.ProjectExperience.createMany({
        data: projects.map((project) => ({
          ...project,
          startDate: new Date(project.startDate),
          endDate: project.endDate ? new Date(project.endDate) : null,
          studentId: session.user.id,
        })),
      });

      return NextResponse.json(createdProjects);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Projects error:', error);
    return NextResponse.json(
      { error: 'Failed to save projects' },
      { status: 500 }
    );
  }
}
