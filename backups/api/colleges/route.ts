import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const colleges = await prisma.college.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        country: true,
        acceptance_rate: true,
        ranking_us_news: true,
      },
    });
    
    console.log(`Fetched ${colleges.length} colleges`);
    
    return NextResponse.json({ colleges });
  } catch (error) {
    console.error('Colleges fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch colleges' },
      { status: 500 }
    );
  }
}
