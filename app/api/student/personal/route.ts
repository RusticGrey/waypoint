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
    
    const student = await prisma.Student.findUnique({
      where: { userId: session.user.id },
      include: {
        personalProfile: true,
      },
    });

    console.log("API - KARTHIK DATA ="+JSON.stringify(student));    
    return NextResponse.json({ personalProfile: student?.personalProfile });
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
    
    const personal = await prisma.PersonalProfile.update({
      where: { studentId: session.user.id },
      data: {
        ...body,
        dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
      },
    });
    
    return NextResponse.json(personal);
  } catch (error) {
    console.error('Personal info update error:', error);
    return NextResponse.json({ error: 'Failed to update personal info' }, { status: 500 });
  }
}
