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
    
    const users = await prisma.user.findMany({
      where: {
        organization_id: session.user.organizationId,
        role: {
          in: ['student', 'coordinator'],
        },
      },
      include: {
        Student: {
          select: {
            coordinator_id: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
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
    
    const body = await req.json();
    const { email, password, first_name, last_name, role, current_grade, graduation_year, coordinator_id } = body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password_hash: hashedPassword,
        first_name,
        last_name,
        role,
        organization_id: session.user.organizationId,
      },
    });
    
    // If student, create student record
    if (role === 'student') {
      await prisma.student.create({
        data: {
          user_id: user.id,
          current_grade: current_grade || 'eleventh',
          graduation_year: graduation_year || new Date().getFullYear() + 2,
          coordinator_id: coordinator_id || null,
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
        organization_id: session.user.organizationId,
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
