import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const personalProfileSchema = z.object({
  preferred_name: z.string().optional(),
  phone: z.string().optional(),
  current_school: z.string().min(1),
  school_location: z.string().min(1),
  parent_name: z.string().min(1),
  parent_email: z.string().email(),
  parent_phone: z.string().min(1),
  current_grade: z.enum(['ninth', 'tenth', 'eleventh', 'twelfth']),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = personalProfileSchema.parse(body);

    // Extract current_grade to update Student table
    const { current_grade, ...personalData } = validatedData;

    // Update student's current_grade
    await prisma.student.update({
      where: { user_id: session.user.id },
      data: { current_grade },
    });

    // Create or update personal profile
    const profile = await prisma.personalProfile.upsert({
      where: { student_id: session.user.id },
      update: personalData,
      create: {
        student_id: session.user.id,
        ...personalData,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Personal profile error:', error);
    return NextResponse.json(
      { error: 'Failed to save personal profile' },
      { status: 500 }
    );
  }
}
