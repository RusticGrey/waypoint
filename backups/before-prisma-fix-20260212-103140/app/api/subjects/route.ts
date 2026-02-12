import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const curriculum = searchParams.get('curriculum');

    if (!curriculum) {
      return NextResponse.json({ error: 'Curriculum parameter required' }, { status: 400 });
    }

    const subjects = await prisma.subject.findMany({
      where: {
        curriculum_type: curriculum,
      },
      select: {
        subject_name: true, // Only select the name
      },
      orderBy: {
        subject_name: 'asc',
      },
    });

    // Extract just the subject names as strings
    const subjectNames = subjects.map(s => s.subject_name);

    return NextResponse.json({ subjects: subjectNames });
  } catch (error) {
    console.error('Subjects fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    );
  }
}
