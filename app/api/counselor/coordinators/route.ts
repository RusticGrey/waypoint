import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const coordinators = await prisma.user.findMany({
      where: { 
        OR: [
          { role: 'coordinator' },
          { role: 'counselor' }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        email: true,
      }
    });

    return NextResponse.json(coordinators);
  } catch (error) {
    console.error('Fetch Hosts Error:', error);
    return NextResponse.json({ error: 'Failed to fetch hosts' }, { status: 500 });
  }
}
