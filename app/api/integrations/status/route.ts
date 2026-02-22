import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (session.user.role === 'student') {
    return NextResponse.json({
      googleConnected: false,
      zoomConnected: false,
      isStudent: true,
    });
  }

  const config = await prisma.userIntegrationConfig.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json({
    googleConnected: config?.googleConnected || false,
    zoomConnected: config?.zoomConnected || false,
    preferredConference: config?.preferredConference || 'Zoom',
    isStudent: false,
  });
}
