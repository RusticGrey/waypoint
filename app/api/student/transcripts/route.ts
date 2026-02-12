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
    
    const transcripts = await prisma.Transcript.findMany({
      where: { studentId: session.user.id },
      orderBy: [
        { gradeLevel: 'asc' },
        { courseName: 'asc' }
      ],
    });
    
    return NextResponse.json({ transcripts });
  } catch (error) {
    console.error('Transcripts fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch transcripts' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    
    const transcript = await prisma.Transcript.create({
      data: {
        studentId: session.user.id,
        ...body,
      },
    });
    
    return NextResponse.json(transcript);
  } catch (error) {
    console.error('Transcript create error:', error);
    return NextResponse.json({ error: 'Failed to create transcript' }, { status: 500 });
  }
}
