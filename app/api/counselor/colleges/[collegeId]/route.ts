import { NextRequest, NextResponse } from 'next/server';
// Dummy comment to trigger re-compilation
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { collegeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { collegeId } = params;

    const college = await prisma.college.findUnique({
      where: { id: collegeId },
      include: {
        documents: {
          orderBy: { uploadedAt: 'desc' },
          select: {
            id: true,
            section: true,
            sourceType: true,
            extractionStatus: true,
            extractedAt: true,
            extractedData: true,
            uploadedAt: true,
            metadata: true
          }
        },
        rankingData: {
          where: { approvedAt: { not: null } },
          include: {
            rankingSource: {
              select: { displayName: true, name: true }
            }
          },
          orderBy: { scraped_at: 'desc' }
        }
      }
    });

    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 });
    }

    return NextResponse.json(college);

  } catch (error: any) {
    console.error('Error fetching college detail:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { collegeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { collegeId } = params;
    const body = await req.json();

    const college = await prisma.college.update({
      where: { id: collegeId },
      data: body
    });

    return NextResponse.json(college);

  } catch (error: any) {
    console.error('Error updating college:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { collegeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'counselor' || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { collegeId } = params;

    await prisma.college.delete({
      where: { id: collegeId }
    });

    return NextResponse.json({ message: 'College deleted successfully' });

  } catch (error: any) {
    console.error('Error deleting college:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
