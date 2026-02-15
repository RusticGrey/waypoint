import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { logChange } from '@/lib/api-helpers/change-log';

const goalSchema = z.object({
  goalType: z.enum(['Academic', 'Testing', 'Activity', 'Achievement', 'Project', 'Other']),
  category: z.string().min(1, 'Category is required'),
  targetValue: z.string().min(1, 'Target is required'),
  currentValue: z.string().optional(),
  deadline: z.string().optional(),
  priority: z.number().min(1).max(10).default(5),
  notes: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    
    const where: any = {
      studentId: session.user.id,
    };
    
    if (status) {
      where.status = status;
    }
    
    const goals = await prisma.ProfileGoal.findMany({
      where,
      orderBy: [
        { status: 'asc' },
        { priority: 'desc' },
        { deadline: 'asc' },
      ],
    });
    
    return NextResponse.json({ goals });
  } catch (error) {
    console.error('Goals fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch goals' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const validatedData = goalSchema.parse(body);
    
    const goal = await prisma.ProfileGoal.create({
      data: {
        studentId: session.user.id,
        ...validatedData,
        deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
      },
    });
    
    // Log the change
    await logChange({
      studentId: session.user.id,
      changeType: 'New_Addition',
      entityType: 'Goal',
      entityId: goal.id,
      action: 'Created',
      description: `Set new goal: ${validatedData.category} - ${validatedData.targetValue}`,
    });
    
    return NextResponse.json(goal);
  } catch (error) {
    console.error('Goal create error:', error);
    return NextResponse.json(
      { error: 'Failed to create goal' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const { id, status, current_value } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    // Get existing goal for logging
    const existingGoal = await prisma.ProfileGoal.findUnique({
      where: { id, studentId: session.user.id },
    });
    
    if (!existingGoal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
    }
    
    const updateData: any = {};
    
    if (status) {
      updateData.status = status;
      if (status === 'Completed') {
        updateData.completedAt = new Date();
        
        // Log milestone
        await logChange({
          studentId: session.user.id,
          changeType: 'Milestone',
          entityType: 'Goal',
          entityId: id,
          action: 'Completed',
          description: `Completed goal: ${existingGoal.category}`,
        });
      } else if (status === 'In_Progress' && existingGoal.status === 'Not_Started') {
        // Log progress
        await logChange({
          studentId: session.user.id,
          changeType: 'Goal_Progress',
          entityType: 'Goal',
          entityId: id,
          action: 'Updated',
          fieldName: 'status',
          oldValue: existingGoal.status,
          newValue: status,
          description: `Started working on: ${existingGoal.category}`,
        });
      }
    }
    
    if (current_value !== undefined) {
      updateData.currentValue = current_value;
      
      // Log progress update
      await logChange({
        studentId: session.user.id,
        changeType: 'Goal_Progress',
        entityType: 'Goal',
        entityId: id,
        action: 'Updated',
        fieldName: 'current_value',
        oldValue: existingGoal.current_value || '',
        newValue: current_value,
        description: `Updated progress on ${existingGoal.category}: ${current_value}`,
      });
    }
    
    const goal = await prisma.ProfileGoal.update({
      where: { id, studentId: session.user.id },
      data: updateData,
    });
    
    return NextResponse.json(goal);
  } catch (error) {
    console.error('Goal update error:', error);
    return NextResponse.json(
      { error: 'Failed to update goal' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    
    const goal = await prisma.ProfileGoal.findUnique({
      where: { id, studentId: session.user.id },
    });
    
    if (goal) {
      await logChange({
        studentId: session.user.id,
        changeType: 'Profile_Update',
        entityType: 'Goal',
        entityId: id,
        action: 'Deleted',
        description: `Removed goal: ${goal.category}`,
      });
    }
    
    await prisma.ProfileGoal.delete({
      where: { id, studentId: session.user.id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Goal delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete goal' },
      { status: 500 }
    );
  }
}
