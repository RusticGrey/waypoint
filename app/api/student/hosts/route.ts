import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (session.user.role !== 'student') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      include: { coordinator: true },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Get the assigned coordinator
    const hosts = [];
    if (student.coordinator) {
      hosts.push({
        id: student.coordinator.id,
        firstName: student.coordinator.firstName,
        lastName: student.coordinator.lastName,
        role: student.coordinator.role,
      });
    }

    // Also get all Counselors (admin level) as they are usually available to all
    const counselors = await prisma.user.findMany({
      where: { role: 'counselor' },
      select: { id: true, firstName: true, lastName: true, role: true },
    });

    // Merge and deduplicate
    const hostIds = new Set(hosts.map(h => h.id));
    counselors.forEach(c => {
      if (!hostIds.has(c.id)) {
        hosts.push(c);
      }
    });

    return NextResponse.json(hosts);
  } catch (error) {
    console.error('Failed to fetch hosts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
