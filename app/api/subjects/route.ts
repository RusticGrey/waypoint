import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const curriculum = searchParams.get('curriculum');

    if (!curriculum) {
      return NextResponse.json({ error: 'Curriculum parameter required' }, { status: 400 });
    }

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
    const subjectNames = subjects.map(s => s.subjectName);

    return NextResponse.json({ subjects: subjectNames });
  } catch (error) {
    console.error('Subjects fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    );
  }
}
