import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
    
    const application = await prisma.collegeApplication.update({
      where: {
        id: params.id,
        student_id: session.user.id,
      },
      data: {
        target_category: body.target_category,
        application_status: body.application_status,
        application_deadline: body.application_deadline ? new Date(body.application_deadline) : null,
        decision_deadline: body.decision_deadline ? new Date(body.decision_deadline) : null,
        essay_status: body.essay_status,
        supplements_status: body.supplements_status,
        recommendation_status: body.recommendation_status,
        test_scores_sent: body.TestScore_sent,
        application_portal_link: body.application_portal_link || null,
        notes: body.notes || null,
        decision_received_date: body.decision_received_date ? new Date(body.decision_received_date) : null,
      },
      include: {
        College: true,
      },
    });
    
    return NextResponse.json(application);
  } catch (error) {
    console.error('Application update error:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
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
    
    await prisma.collegeApplication.delete({
      where: {
        id: params.id,
        student_id: session.user.id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Application delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    );
  }
}
