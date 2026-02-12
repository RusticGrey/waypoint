import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { logChange } from '@/lib/utils/change-log';

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
    const project = await prisma.projectExperience.update({
      where: {
        id: params.id,
        student_id: session.user.id,
      },
      data: {
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
      change_type: 'Profile_Update',
      entity_type: 'Project',
      entity_id: project.id,
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
    
    const project = await prisma.projectExperience.findUnique({
      where: { id: params.id },
    });
    
    if (project) {
      await logChange({
        student_id: session.user.id,
        change_type: 'Profile_Update',
        entity_type: 'Project',
        entity_id: project.id,
        action: 'Deleted',
        description: `Removed project: ${project.title}`,
      });
    }
    
    await prisma.projectExperience.delete({
      where: {
        id: params.id,
        student_id: session.user.id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Project delete error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
