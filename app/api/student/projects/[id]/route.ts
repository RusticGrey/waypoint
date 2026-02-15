import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logChange } from '@/lib/api-helpers/change-log';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    
    // Map form fields to database schema
    const project = await prisma.ProjectExperience.update({
      where: {
        id: params.id,
        studentId: session.user.id,
      },
      data: {
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
      changeType: 'Profile_Update',
      entityType: 'Project',
      entityId: project.id,
      action: 'Updated',
      description: `Updated project: ${body.title}`,
    });
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Project update error:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const project = await prisma.ProjectExperience.findUnique({
      where: { id: params.id },
    });
    
    if (project) {
      await logChange({
        studentId: session.user.id,
        changeType: 'Profile_Update',
        entityType: 'Project',
        entityId: project.id,
        action: 'Deleted',
        description: `Removed project: ${project.title}`,
      });
    }
    
    await prisma.ProjectExperience.delete({
      where: {
        id: params.id,
        studentId: session.user.id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Project delete error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
