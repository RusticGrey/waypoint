import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { deleteEvent } from '@/lib/meetings/googleCalendar';
import { z, ZodError } from 'zod';

const schema = z.object({
  eventId: z.string(),
  hostId: z.string().uuid(),
});

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get('eventId');
  const hostId = searchParams.get('hostId');

  try {
    const validated = schema.parse({ eventId, hostId });
    
    // Only the host or a counselor can delete events
    if (session.user.role !== 'counselor' && session.user.id !== validated.hostId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await deleteEvent(validated.hostId, validated.eventId);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Delete GCal Event Error:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
