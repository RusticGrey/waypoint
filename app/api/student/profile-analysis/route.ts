import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { analyzeProfileDetailed } from '@/lib/utils/profile-analysis-detailed';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const student = await prisma.Student.findUnique({
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
    
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    
    const analysis = analyzeProfileDetailed(student);
    
    // Check for coordinator override
    const override = await prisma.ProfileOverride.findUnique({
      where: { studentId: session.user.id },
      include: {
        coordinator: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    
    if (override) {
      return NextResponse.json({
        ...analysis,
        override: {
          isOverridden: true,
          overrideScore: override.overrideScore,
          overrideReason: override.overrideReason,
          overriddenBy: `${override.user.firstName} ${override.user.lastName}`,
          overriddenAt: override.createdAt,
        },
      });
    }
    
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Profile analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze profile' },
      { status: 500 }
    );
  }
}
