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
    
    const testScores = await prisma.testScore.findMany({
      where: { student_id: session.user.id },
      orderBy: { test_date: 'desc' },
    });
    
    return NextResponse.json({ testScores });
  } catch (error) {
    console.error('Test scores fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test scores' },
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
    
    // Build section_scores JSON object
    const sectionScores: any = {};
    if (body.math_score) sectionScores.math = body.math_score;
    if (body.reading_writing_score) sectionScores.reading_writing = body.reading_writing_score;
    if (body.english_score) sectionScores.english = body.english_score;
    if (body.science_score) sectionScores.science = body.science_score;
    if (body.essay_score) sectionScores.essay = body.essay_score;
    
    const testScore = await prisma.testScore.create({
      data: {
        student_id: session.user.id,
        test_type: body.test_type,
        test_name: body.test_type,
        test_date: new Date(body.test_date),
        composite_score: body.composite_score,
        section_scores: Object.keys(sectionScores).length > 0 ? sectionScores : null,
      },
    });
    
    return NextResponse.json(testScore);
  } catch (error) {
    console.error('Test score create error:', error);
    return NextResponse.json(
      { error: 'Failed to create test score' },
      { status: 500 }
    );
  }
}
