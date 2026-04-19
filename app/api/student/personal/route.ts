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
      where: { userId: session.user.id },
      include: {
        personalProfile: true,
      },
    });

    return NextResponse.json({ 
      personalProfile: student?.personalProfile,
      currentGrade: student?.currentGrade,
      graduationYear: student?.graduationYear 
    });
  } catch (error) {
    console.error('Personal info fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch personal info' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const { currentGrade, graduationYear, ...personalData } = body;

    // Update currentGrade/graduationYear on Student if provided
    if (currentGrade || graduationYear) {
      const updateData: any = {};
      if (currentGrade) updateData.currentGrade = currentGrade;
      if (graduationYear) updateData.graduationYear = parseInt(graduationYear);

      await prisma.student.update({
        where: { userId: session.user.id },
        data: updateData,
      });
    }
    
    const personal = await prisma.personalProfile.update({
      where: { studentId: session.user.id },
      data: {
        ...personalData,
        dateOfBirth: personalData.dateOfBirth ? new Date(personalData.dateOfBirth) : null,
      },
    });
    
    return NextResponse.json(personal);
  } catch (error) {
    console.error('Personal info update error:', error);
    return NextResponse.json({ error: 'Failed to update personal info' }, { status: 500 });
  }
}
