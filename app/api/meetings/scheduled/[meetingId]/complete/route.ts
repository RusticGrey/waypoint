import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z, ZodError } from 'zod';

const completeSchema = z.object({
  counselorNotes: z.string().min(1).optional(),
  studentNotes: z.string().optional(),
  actionItems: z.array(z.string()).default([]),
  studentMood: z.string().optional(),
  nextMeetingDate: z.string().datetime().optional().nullable(),
});

export async function POST(
  req: Request,
  { params }: { params: { meetingId: string } }
) {
  const session = await getServerSession(authOptions);
  const { meetingId } = params;

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = completeSchema.parse(body);

    const meeting = await prisma.meeting.findUnique({
      where: { id: meetingId },
    });

    if (!meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    const isHost = meeting.hostId === session.user.id;
    const isStudent = meeting.studentId === session.user.id;
    const isAdmin = session.user.isAdmin;
    const isCounselor = session.user.role === 'counselor';

    if (!isHost && !isStudent && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Update meeting status if current user is host/admin
      if (isHost || isAdmin) {
        await tx.meeting.update({
          where: { id: meetingId },
          data: { status: 'Completed' },
        });
      }

      // 2. Prep data for upsert
      const updateData: any = {};
      if (validated.counselorNotes !== undefined && (isCounselor || isAdmin)) {
        updateData.counselorNotes = validated.counselorNotes;
      }
      if (validated.studentNotes !== undefined && isStudent) {
        updateData.studentNotes = validated.studentNotes;
      }
      if (validated.actionItems !== undefined && (isCounselor || isAdmin)) {
        updateData.actionItems = validated.actionItems;
      }
      if (validated.studentMood !== undefined) {
        updateData.studentMood = validated.studentMood;
      }
      if (validated.nextMeetingDate !== undefined && (isCounselor || isAdmin)) {
        updateData.nextMeetingDate = validated.nextMeetingDate ? new Date(validated.nextMeetingDate) : null;
      }

      // 3. Upsert meeting note
      const meetingNote = await tx.meetingNote.upsert({
        where: { meetingId: meetingId },
        create: {
          meetingId,
          studentId: meeting.studentId,
          counselorId: meeting.hostId,
          counselorNotes: validated.counselorNotes || '',
          studentNotes: validated.studentNotes || '',
          actionItems: validated.actionItems || [],
          studentMood: validated.studentMood || null,
          nextMeetingDate: validated.nextMeetingDate ? new Date(validated.nextMeetingDate) : null,
        },
        update: updateData,
      });

      return { meetingNote };
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Complete/Update Meeting Note Error:', error);
    return NextResponse.json({ error: 'Failed to update notes' }, { status: 500 });
  }
}
