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
      include: { 
        counselor: {
          include: { user: true }
        } 
      },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Get the assigned counselor
    const hosts = [];
    if (student.counselor) {
      hosts.push({
        id: student.counselor.userId,
        firstName: student.counselor.user.firstName,
        lastName: student.counselor.user.lastName,
        isAdmin: student.counselor.isAdmin,
        role: student.counselor.user.role,
      });
    }

    // Also get all Admin Counselors as they are usually available to all
    const adminCounselors = await prisma.counselor.findMany({
      where: { isAdmin: true },
      include: { user: true },
    });

    const formattedAdmins = adminCounselors.map(c => ({
      id: c.userId,
      firstName: c.user.firstName,
      lastName: c.user.lastName,
      isAdmin: c.isAdmin,
      role: c.user.role,
    }));

    // Merge and deduplicate
    const hostIds = new Set(hosts.map(h => h.id));
    formattedAdmins.forEach(c => {
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
