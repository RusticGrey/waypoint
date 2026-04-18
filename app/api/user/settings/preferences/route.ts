import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const role = session.user.role;

    // Base user preferences (universal)
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (role === 'student') {
      const student = await prisma.student.findUnique({
        where: { userId },
      });
      return NextResponse.json({ 
        timezone: (user as any)?.timezone, 
        notificationsEnabled: (student as any)?.notificationsEnabled 
      });
    } else {
      const counselor = await prisma.counselorSettings.findUnique({
        where: { userId },
      });
      return NextResponse.json({ 
        timezone: (user as any)?.timezone, 
        defaultMeetingDuration: (counselor as any)?.defaultMeetingDuration,
        bufferTime: (counselor as any)?.bufferTime 
      } as any);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch preferences' }, { status: 500 });
  }
}
