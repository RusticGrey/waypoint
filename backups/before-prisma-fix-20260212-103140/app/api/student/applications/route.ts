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
    
    const applications = await prisma.collegeApplication.findMany({
      where: { student_id: session.user.id },
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
        { application_deadline: 'asc' },
        { created_at: 'desc' },
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
    if (!body.college_id || !body.target_category) {
      return NextResponse.json(
        { error: 'College and category are required' },
        { status: 400 }
      );
    }
    
    const application = await prisma.collegeApplication.create({
      data: {
        student_id: session.user.id,
        college_id: body.college_id,
        target_category: body.target_category,
        application_status: body.application_status || 'Not_Started',
        application_deadline: body.application_deadline ? new Date(body.application_deadline) : null,
        decision_deadline: body.decision_deadline ? new Date(body.decision_deadline) : null,
        essay_status: body.essay_status || 'Not Started',
        supplements_status: body.supplements_status || 'Not Started',
        recommendation_status: body.recommendation_status || 'Not Requested',
        test_scores_sent: body.test_scores_sent || false,
        application_portal_link: body.application_portal_link || null,
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
