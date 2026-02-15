import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logChange } from '@/lib/api-helpers/change-log';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const projects = await prisma.ProjectExperience.findMany({
      where: { studentId: session.user.id },
      orderBy: { startDate: 'desc' },
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
    const project = await prisma.ProjectExperience.create({
      data: {
        studentId: session.user.id,
        title: body.title,
        experienceType: body.experienceType,
        organization: body.organization || null,
        roleTitle: body.role || null, // Map 'role' to 'role_title'
        // location: body.location || null,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        isOngoing: body.isOngoing,
        description: body.description,
        // outcomes: body.outcomes || null,
        // skillsLearned: body.skillsLearned || null,
        // projectLink: body.projectLink || null,
      },
    });
    
    await logChange({
      studentId: session.user.id,
      changeType: 'New_Addition',
      entityType: 'Project',
      entityId: project.id,
      action: 'Created',
      description: `Added new project: ${body.title}`,
    });
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Project create error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
