import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const personalProfileSchema = z.object({
  preferredName: z.string().optional(),
  phone: z.string().optional(),
  currentSchool: z.string().min(1),
  schoolLocation: z.string().min(1),
  parentName: z.string().min(1),
  parentEmail: z.string().email(),
  parentPhone: z.string().min(1),
  currentGrade: z.enum(['ninth', 'tenth', 'eleventh', 'twelfth']),
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
    const { currentGrade, ...personalData } = validatedData;

    // Update student's current_grade
    await prisma.Student.update({
      where: { userId: session.user.id },
      data: { currentGrade },
    });

    // Create or update personal profile
    const profile = await prisma.PersonalProfile.upsert({
      where: { studentId: session.user.id },
      update: personalData,
      create: {
        studentId: session.user.id,
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
