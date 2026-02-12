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

    await prisma.projectExperience.deleteMany({
      where: { student_id: session.user.id },
    });

    if (projects.length > 0) {
      const createdProjects = await prisma.projectExperience.createMany({
        data: projects.map((project) => ({
          ...project,
          start_date: new Date(project.start_date),
          end_date: project.end_date ? new Date(project.end_date) : null,
          student_id: session.user.id,
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
