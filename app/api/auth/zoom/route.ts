import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getZoomAuthUrl } from '@/lib/meetings/zoom';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Only counselors and coordinators can connect Zoom
  if (session.user.role === 'student') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const url = getZoomAuthUrl(session.user.id);
  return NextResponse.redirect(url);
}
