import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const colleges = await prisma.college.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        country: true,
        acceptanceRate: true,
        rankingUsNews: true,
        avgGpa: true,
        avgSat: true,
        avgAct: true,
        isActive: true,
      },
    });
    
    return NextResponse.json({ colleges });
  } catch (error) {
    console.error('Colleges fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch colleges' },
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
    
    const college = await prisma.college.create({
      data: {
        name: body.name,
        country: body.country || 'United States',
        acceptanceRate: body.acceptanceRate ? parseFloat(body.acceptanceRate) : null,
        rankingUsNews: body.rankingUsNews ? parseInt(body.rankingUsNews) : null,
        avgGpa: body.avgGpa ? parseFloat(body.avgGpa) : null,
        avgSat: body.avgSat ? parseInt(body.avgSat) : null,
        avgAct: body.avgAct ? parseInt(body.avgAct) : null,
        isActive: true,
      },
    });
    
    return NextResponse.json(college);
  } catch (error) {
    console.error('College create error:', error);
    return NextResponse.json(
      { error: 'Failed to create college' },
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
            return NextResponse.json({ error: 'College ID required' }, { status: 400 });
        }

        await prisma.college.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('College delete error:', error);
        return NextResponse.json(
            { error: 'Failed to delete college' },
            { status: 500 }
        );
    }
}
