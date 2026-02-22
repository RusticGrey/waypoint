import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getFreeBusy } from '@/lib/meetings/googleCalendar';
import { z, ZodError } from 'zod';

const schema = z.object({
  hostId: z.string().uuid(),
  timeMin: z.string().datetime(),
  timeMax: z.string().datetime(),
});

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const hostId = searchParams.get('hostId');
  const timeMin = searchParams.get('timeMin');
  const timeMax = searchParams.get('timeMax');

  try {
    const validated = schema.parse({ hostId, timeMin, timeMax });
    const busy = await getFreeBusy(validated.hostId, validated.timeMin, validated.timeMax);

    return NextResponse.json({ busy });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('FreeBusy Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
