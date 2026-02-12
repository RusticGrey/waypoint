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
    
    const testScores = await prisma.TestScore.findMany({
      where: { studentId: session.user.id },
      orderBy: { testDate: 'desc' },
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
        
    const testScore = await prisma.TestScore.create({
      data: {
        studentId: session.user.id,
        testType: body.testType,
        testDate: new Date(body.testDate),
        compositeScore: body.compositeScore,
        mathScore: body.mathScore,
        readingWritingScore: body.readingWritingScore,
        scienceScore: body.scienceScore,
        englishScore: body.englishScore,

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
