import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { CurriculumType } from '@prisma/client';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const transcripts = await prisma.transcript.findMany({
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
    
    // Add to global subjects if curriculum is provided
    if (body.curriculumType && body.courseName) {
      try {
        await prisma.subject.upsert({
          where: {
            subjectName_curriculumType: {
              subjectName: body.courseName,
              curriculumType: body.curriculumType as CurriculumType,
            }
          },
          update: {},
          create: {
            subjectName: body.courseName,
            curriculumType: body.curriculumType as CurriculumType,
          }
        });
      } catch (e) {
        console.error('Failed to upsert subject:', e);
      }
    }

    const transcript = await prisma.transcript.create({
      data: {
        studentId: session.user.id,
        courseName: body.courseName,
        gradeLevel: body.gradeLevel,
        semester: body.semester,
        gradeValue: body.gradeValue,
        credits: body.credits,
        honorsLevel: body.honorsLevel,
        isBoardExam: body.isBoardExam,
        curriculumType: (body.curriculumType && body.curriculumType !== '') ? body.curriculumType : null,
        otherCurriculumName: body.otherCurriculumName || null,
        gradingSystemType: (body.gradingSystemType && body.gradingSystemType !== '') ? body.gradingSystemType : null,
      },
    });
    
    return NextResponse.json(transcript);
  } catch (error) {
    console.error('Transcript create error:', error);
    return NextResponse.json({ error: 'Failed to create transcript' }, { status: 500 });
  }
}
