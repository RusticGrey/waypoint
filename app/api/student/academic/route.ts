import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const student = await prisma.student.findUnique({
      where: { user_id: session.user.id },
      include: {
        academic_profile: true,
      },
    });
    
    return NextResponse.json({ academic_profile: student?.academic_profile });
  } catch (error) {
    console.error('Academic info fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch academic info' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    
    console.log('Updating academic profile:', body);
    
    // Convert current_gpa to string since it's stored as String in DB
    const academic = await prisma.academicProfile.update({
      where: { student_id: session.user.id },
      data: {
        curriculum_type: body.curriculum_type,
        grading_system_type: body.grading_system_type,
        current_gpa: body.current_gpa ? body.current_gpa.toString() : null, // Convert to string
      },
    });
    
    console.log('Updated successfully:', academic);
    
    return NextResponse.json(academic);
  } catch (error) {
    console.error('Academic info update error:', error);
    return NextResponse.json({ error: 'Failed to update academic info' }, { status: 500 });
  }
}
