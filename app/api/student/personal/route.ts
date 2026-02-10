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
        personal_profile: true,
      },
    });
    
    return NextResponse.json({ personal_profile: student?.personal_profile });
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
    
    const personal = await prisma.personalProfile.update({
      where: { student_id: session.user.id },
      data: {
        ...body,
        date_of_birth: body.date_of_birth ? new Date(body.date_of_birth) : null,
      },
    });
    
    return NextResponse.json(personal);
  } catch (error) {
    console.error('Personal info update error:', error);
    return NextResponse.json({ error: 'Failed to update personal info' }, { status: 500 });
  }
}
