import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const colleges = await prisma.college.findMany({
      include: {
        _count: {
          select: { 
            documents: true,
            insights: true
          }
        },
        insights: {
          where: { status: 'approved' },
          select: { id: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json(colleges);

  } catch (error: any) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, location, website } = body;

    if (!name) {
      return NextResponse.json({ error: 'College name is required' }, { status: 400 });
    }

    const slugId = name.toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const college = await prisma.college.create({
      data: {
        id: slugId,
        name,
        shortName: body.shortName || null,
        country: body.country || 'United States',
        isActive: true
      }
    });

    return NextResponse.json(college);

  } catch (error: any) {
    console.error('Error creating college:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
