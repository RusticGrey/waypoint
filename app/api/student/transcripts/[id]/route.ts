import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    
    const transcript = await prisma.transcript.update({
      where: {
        id: params.id,
        studentId: session.user.id,
      },
      data: body,
    });
    
    return NextResponse.json(transcript);
  } catch (error) {
    console.error('Transcript update error:', error);
    return NextResponse.json({ error: 'Failed to update transcript' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await prisma.transcript.delete({
      where: {
        id: params.id,
        studentId: session.user.id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Transcript delete error:', error);
    return NextResponse.json({ error: 'Failed to delete transcript' }, { status: 500 });
  }
}
