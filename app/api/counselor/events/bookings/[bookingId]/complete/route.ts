import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const completeSignupSchema = z.object({
  didAttend: z.boolean(),
  counselorNotes: z.string().optional(),
  openNextSlot: z.boolean().default(true),
});

export async function PATCH(
  req: Request,
  { params }: { params: { bookingId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== 'counselor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { bookingId } = params;
    const body = await req.json();
    const validated = completeSignupSchema.parse(body);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Update the signup status
      const signup = await tx.eventSignup.update({
        where: { id: bookingId },
        data: {
          status: validated.didAttend ? 'Completed' : 'NoShow',
          didAttend: validated.didAttend,
          counselorNotes: validated.counselorNotes,
          completedAt: new Date(),
          completedBy: session.user.id,
        },
        include: {
          slot: true,
        },
      });

      // 2. If attending and openNextSlot is true, we could implement logic here
      // but for now we just follow the status update.

      return signup;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Complete Event Signup Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
