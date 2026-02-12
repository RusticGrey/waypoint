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
    
    // Build section_scores JSON object
    const sectionScores: any = {};
    if (body.math_score) sectionScores.math = body.math_score;
    if (body.reading_writing_score) sectionScores.reading_writing = body.reading_writing_score;
    if (body.english_score) sectionScores.english = body.english_score;
    if (body.science_score) sectionScores.science = body.science_score;
    if (body.essay_score) sectionScores.essay = body.essay_score;
    
    const testScore = await prisma.testScore.update({
      where: {
        id: params.id,
        student_id: session.user.id,
      },
      data: {
        test_type: body.test_type,
        test_name: body.test_type,
        test_date: new Date(body.test_date),
        composite_score: body.composite_score,
        section_scores: Object.keys(sectionScores).length > 0 ? sectionScores : null,
      },
    });
    
    return NextResponse.json(testScore);
  } catch (error) {
    console.error('Test score update error:', error);
    return NextResponse.json(
      { error: 'Failed to update test score' },
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
    
    await prisma.testScore.delete({
      where: {
        id: params.id,
        student_id: session.user.id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Test score delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete test score' },
      { status: 500 }
    );
  }
}
