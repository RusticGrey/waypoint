import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { exchangeCode } from '@/lib/meetings/googleCalendar';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code || state !== session.user.id) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    await exchangeCode(code, session.user.id);
    const role = session.user.role;
    return NextResponse.redirect(new URL(`/${role}/meetings/setup`, req.url));
  } catch (error) {
    console.error('Google OAuth Callback Error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
