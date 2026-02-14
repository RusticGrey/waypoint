import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url);
    const curriculum = searchParams.get('curriculum');

    if (!curriculum) {
      return NextResponse.json({ error: 'Curriculum parameter required' }, { status: 400 });
    }

    // const session = await getServerSession(authOptions);
    // if (!session?.user?.id || session.user.role !== 'counselor') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
        
    const subjects = await prisma.Subject.findMany({
      where: {
        curriculumType: curriculum,
      },
      select: {
        subjectName: true, // Only select the name
      },
      orderBy: {
        subjectName: 'asc',
      },
    });

    // Extract just the subject names as strings
    // const subjectNames = subjects.map(s => s.subjectName);

    return NextResponse.json({ subjects: subjects });
  } catch (error) {
    console.error('Subjects fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    // const { searchParams } = new URL(req.url);
    // const curriculum = searchParams.get('curriculum');

    // if (!curriculum) {
    //   return NextResponse.json({ error: 'Curriculum parameter required' }, { status: 400 });
    // }
        
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    
    const subject = await prisma.Subject.create({
      data: {
        subjectName: body.subjectName,
        curriculumType: body.curriculumType,
      },
    });
    
    return NextResponse.json(subject);
  } catch (error) {
    console.error('Subject create error:', error);
    return NextResponse.json(
      { error: 'Failed to create Subject' },
      { status: 500 }
    );
  }
}

