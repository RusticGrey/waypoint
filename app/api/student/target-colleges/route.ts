import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const targetCollegeSchema = z.object({
  collegeId: z.string(),
  targetCategory: z.enum(['Reach', 'Match', 'Safety']),
  priority: z.number().min(1).max(10).default(5),
  // notes: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const targetColleges = await prisma.TargetCollege.findMany({
      where: {
        studentId: session.user.id,
      },
      include: {
        college: true,
      },
      orderBy: {
        priority: 'desc',
      },
    });
    
    return NextResponse.json({ targetColleges });
  } catch (error) {
    console.error('Target colleges fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch target colleges' },
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
    const validatedData = targetCollegeSchema.parse(body);
    
    const targetCollege = await prisma.TargetCollege.create({
      data: {
        studentId: session.user.id,
        ...validatedData,
      },
      include: {
        college: true,
      },
    });
    
    return NextResponse.json(targetCollege);
  } catch (error) {
    console.error('Target college create error:', error);
    return NextResponse.json(
      { error: 'Failed to add target college' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    await prisma.TargetCollege.delete({
      where: {
        id,
        studentId: session.user.id, // Ensure student owns this target
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Target college delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete target college' },
      { status: 500 }
    );
  }
}
