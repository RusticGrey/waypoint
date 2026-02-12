import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logChange } from '@/lib/utils/change-log';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const projects = await prisma.projectExperience.findMany({
      where: { student_id: session.user.id },
      orderBy: { start_date: 'desc' },
    });
    
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Projects fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    
    // Map form fields to database schema
    const project = await prisma.projectExperience.create({
      data: {
        student_id: session.user.id,
        title: body.title,
        experience_type: body.experience_type,
        organization: body.organization || null,
        role_title: body.role || null, // Map 'role' to 'role_title'
        location: body.location || null,
        start_date: new Date(body.start_date),
        end_date: body.end_date ? new Date(body.end_date) : null,
        is_ongoing: body.is_ongoing,
        description: body.description,
        outcomes: body.outcomes || null,
        skills_learned: body.skills_learned || null,
        project_link: body.project_link || null,
      },
    });
    
    await logChange({
      student_id: session.user.id,
      change_type: 'New_Addition',
      entity_type: 'Project',
      entity_id: project.id,
      action: 'Created',
      description: `Added new project: ${body.title}`,
    });
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Project create error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
