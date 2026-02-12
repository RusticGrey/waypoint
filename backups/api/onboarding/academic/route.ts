import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { academicProfileSchema } from '@/lib/validations/student';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = academicProfileSchema.parse(body);

    // Create or update academic profile
    const profile = await prisma.academicProfile.upsert({
      where: { student_id: session.user.id },
      update: validatedData,
      create: {
        student_id: session.user.id,
        ...validatedData,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Academic profile error:', error);
    return NextResponse.json(
      { error: 'Failed to save academic profile' },
      { status: 500 }
    );
  }
}
