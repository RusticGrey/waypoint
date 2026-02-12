import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { transcriptSchema } from '@/lib/validations/student';
import { z } from 'zod';

const transcriptsArraySchema = z.object({
  Transcript: z.array(transcriptSchema),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { transcripts } = transcriptsArraySchema.parse(body);

    // Delete existing transcripts and create new ones
    await prisma.transcript.deleteMany({
      where: { student_id: session.user.id },
    });

    const createdTranscripts = await prisma.transcript.createMany({
      data: transcripts.map((transcript) => ({
        ...transcript,
        student_id: session.user.id,
      })),
    });

    return NextResponse.json(createdTranscripts);
  } catch (error) {
    console.error('Transcripts error:', error);
    return NextResponse.json(
      { error: 'Failed to save transcripts' },
      { status: 500 }
    );
  }
}
