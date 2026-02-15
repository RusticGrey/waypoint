import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { transcriptSchema } from '@/lib/validations/student';
import { z } from 'zod';
import { calculateProfileCompletion } from '@/lib/utils/profile-completion';
import { updateStudentProfileCompletion } from '@/lib/api-helpers/profile';

const transcriptsArraySchema = z.object({
  transcripts: z.array(transcriptSchema),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { transcripts } = transcriptsArraySchema.parse(body);

    // Deduplicate transcripts based on unique constraint fields
    const uniqueTranscriptsMap = new Map();
    transcripts.forEach((t) => {
      const key = `${t.courseName}-${t.gradeLevel}-${t.semester}`;
      uniqueTranscriptsMap.set(key, t); // This keeps the last occurrence
    });
    const uniqueTranscripts = Array.from(uniqueTranscriptsMap.values());

    // Delete existing transcripts and create new ones
    await prisma.transcript.deleteMany({
      where: { studentId: session.user.id },
    });

    const createdTranscripts = await prisma.transcript.createMany({
      data: uniqueTranscripts.map((transcript) => ({
        courseName: transcript.courseName,
        gradeLevel: transcript.gradeLevel,
        semester: transcript.semester,
        gradeValue: transcript.gradeValue,
        credits: transcript.credits,
        honorsLevel: transcript.honorsLevel,
        isBoardExam: transcript.isBoardExam,
        studentId: session.user.id,
      })),
    });

    // Update profile completion percentage
    const student = await prisma.student.findUnique({
      where: { userId: session.user.id },
      include: {
        personalProfile: true,
        academicProfile: true,
        transcripts: true,
        activities: true,
        achievements: true,
        projectExperiences: true,
        testScores: true,
      },
    });

    let completionPercentage = 0;
    if (student) {
      const { percentage } = calculateProfileCompletion(student);
      completionPercentage = percentage;
      await updateStudentProfileCompletion(session.user.id, percentage);
    }

    return NextResponse.json({ data: createdTranscripts, completionPercentage });
  } catch (error) {
    console.error('Transcripts error:', error);
    return NextResponse.json(
      { error: 'Failed to save transcripts' },
      { status: 500 }
    );
  }
}
