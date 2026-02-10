import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || (session.user.role !== 'coordinator' && session.user.role !== 'counselor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const { student_id, override_score, override_reason } = body;
    
    // Validate score
    if (override_score < 0 || override_score > 100) {
      return NextResponse.json({ error: 'Score must be between 0 and 100' }, { status: 400 });
    }
    
    // Upsert override
    const override = await prisma.profileOverride.upsert({
      where: { student_id },
      create: {
        student_id,
        override_score,
        override_reason,
        overridden_by: session.user.id,
      },
      update: {
        override_score,
        override_reason,
        overridden_by: session.user.id,
      },
    });
    
    return NextResponse.json(override);
  } catch (error) {
    console.error('Profile override error:', error);
    return NextResponse.json(
      { error: 'Failed to save override' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || (session.user.role !== 'coordinator' && session.user.role !== 'counselor')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const student_id = searchParams.get('student_id');
    
    if (!student_id) {
      return NextResponse.json({ error: 'student_id required' }, { status: 400 });
    }
    
    await prisma.profileOverride.delete({
      where: { student_id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Profile override delete error:', error);
    return NextResponse.json(
      { error: 'Failed to remove override' },
      { status: 500 }
    );
  }
}
