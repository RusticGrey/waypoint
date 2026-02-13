import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
            
    const users = await prisma.User.findMany({
      where: {
        organizationId: session.user.organizationId,
        role: {
          in: ['student', 'coordinator'],
        },
      },
      include: {
        student: {
          select: {
            coordinatorId: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Users fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.log("SESSION USER = "+JSON.stringify(session.user));
        
    const sessionUser = await prisma.User.findUnique({
      where: { id: session.user.id },
      include: {
        student: true,
      },
    });    
    console.log("MY USER = "+JSON.stringify(sessionUser));
        
    const body = await req.json();
    const { email, password, firstName, lastName, role, currentGrade, graduationYear, coordinatorId } = body;
    
    // Check if user already exists
    const existingUser = await prisma.User.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.User.create({
      data: {
        email,
        passwordHash: hashedPassword,
        firstName,
        lastName,
        role,
        organizationId: sessionUser.organizationId,
      },
    });
    
    // If student, create student record
    if (role === 'student') {
      await prisma.Student.create({
        data: {
          userId: user.id,
          currentGrade: currentGrade || 'eleventh',
          graduationYear: graduationYear || new Date().getFullYear() + 2,
          coordinatorId: coordinatorId || null,
        },
      });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('User create error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    await prisma.user.delete({
      where: {
        id,
        organizationId: session.user.organizationId,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('User delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}



