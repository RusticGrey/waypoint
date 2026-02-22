import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z, ZodError } from 'zod';

const schema = z.object({
  preferredConference: z.enum(['Zoom', 'GoogleMeet']),
});

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (session.user.role === 'student') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { preferredConference } = schema.parse(body);

    const config = await prisma.userIntegrationConfig.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        preferredConference,
      },
      update: {
        preferredConference,
      },
    });

    return NextResponse.json({ preferredConference: config.preferredConference });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 });
  }
}
