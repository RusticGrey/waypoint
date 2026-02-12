import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const colleges = await prisma.College.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        country: true,
        acceptanceRate: true,
        rankingUsNews: true,
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
