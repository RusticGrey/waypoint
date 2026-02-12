import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const applications = await prisma.CollegeApplication.findMany({
      where: { studentId: session.user.id },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            country: true,
          },
        },
      },
      orderBy: [
        { applicationDeadline: 'asc' },
        { createdAt: 'desc' },
      ],
    });
    
    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Applications fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    
    // Validate required fields
    if (!body.collegeId || !body.targetCategory) {
      return NextResponse.json(
        { error: 'College and category are required' },
        { status: 400 }
      );
    }
    
    const application = await prisma.CollegeApplication.create({
      data: {
        studentId: session.user.id,
        collegeId: body.collegeId,
        targetCategory: body.targetCategory,
        applicationStatus: body.applicationStatus || 'Not_Started',
        applicationDeadline: body.applicationDeadline ? new Date(body.applicationDeadline) : null,
        decisionDeadline: body.decisionDeadline ? new Date(body.decisionDeadline) : null,
        essayStatus: body.essayStatus || 'Not Started',
        supplementsStatus: body.supplementsStatus || 'Not Started',
        recommendationStatus: body.recommendationStatus || 'Not Requested',
        testScoresSent: body.testScoresSent || false,
        applicationPortalLink: body.applicationPortalLink || null,
        notes: body.notes || null,
      },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            country: true,
          },
        },
      },
    });
    
    return NextResponse.json(application);
  } catch (error) {
    console.error('Application create error:', error);
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}
