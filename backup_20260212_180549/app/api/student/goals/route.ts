import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { logChange } from '@/lib/utils/change-log';

const goalSchema = z.object({
  goal_type: z.enum(['Academic', 'Testing', 'Activity', 'Achievement', 'Project', 'Other']),
  category: z.string().min(1, 'Category is required'),
  target_value: z.string().min(1, 'Target is required'),
  current_value: z.string().optional(),
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
      student_id: session.user.id,
    };
    
    if (status) {
      where.status = status;
    }
    
    const goals = await prisma.profileGoal.findMany({
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
    
    const goal = await prisma.profileGoal.create({
      data: {
        student_id: session.user.id,
        ...validatedData,
        deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
      },
    });
    
    // Log the change
    await logChange({
      student_id: session.user.id,
      change_type: 'New_Addition',
      entity_type: 'Goal',
      entity_id: goal.id,
      action: 'Created',
      description: `Set new goal: ${validatedData.category} - ${validatedData.target_value}`,
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
    const existingGoal = await prisma.profileGoal.findUnique({
      where: { id, student_id: session.user.id },
    });
    
    if (!existingGoal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
    }
    
    const updateData: any = {};
    
    if (status) {
      updateData.status = status;
      if (status === 'Completed') {
        updateData.completed_at = new Date();
        
        // Log milestone
        await logChange({
          student_id: session.user.id,
          change_type: 'Milestone',
          entity_type: 'Goal',
          entity_id: id,
          action: 'Completed',
          description: `Completed goal: ${existingGoal.category}`,
        });
      } else if (status === 'In_Progress' && existingGoal.status === 'Not_Started') {
        // Log progress
        await logChange({
          student_id: session.user.id,
          change_type: 'Goal_Progress',
          entity_type: 'Goal',
          entity_id: id,
          action: 'Updated',
          field_name: 'status',
          old_value: existingGoal.status,
          new_value: status,
          description: `Started working on: ${existingGoal.category}`,
        });
      }
    }
    
    if (current_value !== undefined) {
      updateData.current_value = current_value;
      
      // Log progress update
      await logChange({
        student_id: session.user.id,
        change_type: 'Goal_Progress',
        entity_type: 'Goal',
        entity_id: id,
        action: 'Updated',
        field_name: 'current_value',
        old_value: existingGoal.current_value || '',
        new_value: current_value,
        description: `Updated progress on ${existingGoal.category}: ${current_value}`,
      });
    }
    
    const goal = await prisma.profileGoal.update({
      where: { id, student_id: session.user.id },
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
    
    const goal = await prisma.profileGoal.findUnique({
      where: { id, student_id: session.user.id },
    });
    
    if (goal) {
      await logChange({
        student_id: session.user.id,
        change_type: 'Profile_Update',
        entity_type: 'Goal',
        entity_id: id,
        action: 'Deleted',
        description: `Removed goal: ${goal.category}`,
      });
    }
    
    await prisma.profileGoal.delete({
      where: { id, student_id: session.user.id },
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
