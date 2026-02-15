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
        studentId: session.user.id,
      },
      data: {
        targetCategory: body.targetCategory,
        applicationStatus: body.applicationStatus,
        applicationDeadline: body.applicationDeadline ? new Date(body.applicationDeadline) : null,
        decisionDeadline: body.decisionDeadline ? new Date(body.decisionDeadline) : null,
        essayStatus: body.essayStatus,
        supplementsStatus: body.supplementsStatus,
        recommendationStatus: body.recommendationStatus,
        testScoresSent: body.testScores_sent,
        applicationPortalLink: body.applicationPortalLink || null,
        notes: body.notes || null,
        decisionReceivedDate: body.decisionReceivedDate ? new Date(body.decisionReceivedDate) : null,
      },
      include: {
        college: true,
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
        studentId: session.user.id,
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
