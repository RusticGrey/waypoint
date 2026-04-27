import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { documentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { documentId } = params;
    const body = await req.json();
    const { extractedData, extractionStatus } = body;

    const data: any = {};
    if (extractedData !== undefined) data.extractedData = extractedData;
    if (extractionStatus !== undefined) data.extractionStatus = extractionStatus;
    if (extractedData !== undefined || extractionStatus === 'extracted') {
      data.extractedAt = new Date();
    }

    const document = await (prisma as any).collegeDocument.update({
      where: { id: documentId },
      data
    });

    return NextResponse.json(document);

  } catch (error: any) {
    console.error('Error updating document:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { documentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { documentId } = params;

    await (prisma as any).collegeDocument.delete({
      where: { id: documentId }
    });

    return NextResponse.json({ message: 'Document deleted successfully' });

  } catch (error: any) {
    console.error('Error deleting document:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
