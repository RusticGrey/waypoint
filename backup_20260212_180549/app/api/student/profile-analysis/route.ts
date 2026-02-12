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
    
    const student = await prisma.student.findUnique({
      where: { user_id: session.user.id },
      include: {
        PersonalProfile: true,
        AcademicProfile: true,
        Transcript: true,
        Activity: true,
        Achievement: true,
        ProjectExperience: true,
        TestScore: true,
      },
    });
    
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    
    const analysis = analyzeProfileDetailed(student);
    
    // Check for counselor override
    const override = await prisma.profileOverride.findUnique({
      where: { student_id: session.user.id },
      include: {
        User: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });
    
    if (override) {
      return NextResponse.json({
        ...analysis,
        override: {
          is_overridden: true,
          override_score: override.override_score,
          override_reason: override.override_reason,
          overridden_by: `${override.User.first_name} ${override.User.last_name}`,
          overridden_at: override.created_at,
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
