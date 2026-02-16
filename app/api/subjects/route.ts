import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { CurriculumType } from '@prisma/client';

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
    
        
    const subjects = await prisma.subject.findMany({
      where: {
        curriculumType: curriculum as CurriculumType,
      },
      select: {
        id: true,
        subjectName: true,
      },
      orderBy: {
        subjectName: 'asc',
      },
    });

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
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || (session.user.role !== 'counselor' && session.user.role !== 'coordinator')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    
    const subject = await prisma.subject.create({
      data: {
        subjectName: body.subjectName,
        curriculumType: body.curriculumType as CurriculumType,
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

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id || (session.user.role !== 'counselor' && session.user.role !== 'coordinator')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    
        const body = await req.json();
        
        if (!body.id || !body.subjectName) {
            return NextResponse.json({ error: 'Subject ID and Name required' }, { status: 400 });
        }

        const subject = await prisma.subject.update({
            where: { id: body.id },
            data: {
                subjectName: body.subjectName,
            },
        });
    
        return NextResponse.json(subject);
    } catch (error) {
        console.error('Subject update error:', error);
        return NextResponse.json(
            { error: 'Failed to update subject' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.id || (session.user.role !== 'counselor' && session.user.role !== 'coordinator')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Subject ID required' }, { status: 400 });
        }

        await prisma.subject.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Subject delete error:', error);
        return NextResponse.json(
            { error: 'Failed to delete subject' },
            { status: 500 }
        );
    }
}
