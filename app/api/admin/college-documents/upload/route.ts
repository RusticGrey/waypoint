import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ExtractionEngine } from '@/lib/extraction/extractionEngine';
import crypto from 'crypto';
const pdf = require('pdf-parse');

// Next.js 14 Route Segment Config
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Increase timeout for large file processing if needed

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const collegeId = formData.get('collegeId') as string;
    const dataSourceId = formData.get('dataSourceId') as string;
    const academicYear = formData.get('academicYear') as string || new Date().getFullYear().toString();
    const documentType = formData.get('documentType') as string || 'html';
    const override = formData.get('override') === 'true';
    const htmlFile = formData.get('file') as File;

    if (!collegeId || !dataSourceId || !htmlFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let fileContent = '';
    const fileName = htmlFile.name.toLowerCase();
    const contentType = htmlFile.type.toLowerCase();
    
    console.log(`[Upload] File metadata - Name: ${htmlFile.name}, Type: ${htmlFile.type}, DocumentType: ${documentType}`);

    // Validations to prevent silent failures for mismatched types
    if (documentType === 'true_pdf' && !htmlFile.type.includes('pdf')) {
      return NextResponse.json({ error: 'Selected True PDF, but uploaded file is not a PDF.' }, { status: 400 });
    }
    if (documentType === 'image_pdf' && !htmlFile.type.includes('pdf')) {
      return NextResponse.json({ error: 'Selected Image PDF, but uploaded file is not a PDF.' }, { status: 400 });
    }
    if (documentType === 'image' && !htmlFile.type.includes('image')) {
      return NextResponse.json({ error: 'Selected Image, but uploaded file is not an image.' }, { status: 400 });
    }
    if (documentType === 'html' && !(htmlFile.type.includes('html') || htmlFile.name.endsWith('.html') || htmlFile.name.endsWith('.htm'))) {
      return NextResponse.json({ error: 'Selected HTML, but uploaded file is not an HTML document.' }, { status: 400 });
    }

    // PHASE 1: Storage Only (No Processing during upload)
    
    if (documentType === 'html') {
      fileContent = await htmlFile.text();
      // Ensure it's not base64 accidentally
      if (fileContent.startsWith('JVBERi0')) {
        return NextResponse.json({ error: 'You selected HTML, but the file appears to be a PDF binary. Please select True PDF or Image PDF.' }, { status: 400 });
      }
    } else {
      // True PDF, Image PDF, or Images get stored as base64 for later processing by Gemini Vision or PDF parsers
      const arrayBuffer = await htmlFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fileContent = buffer.toString('base64');
    }

    const contentHash = crypto.createHash('sha256').update(fileContent).digest('hex');

    console.log(`[Upload] Saving file: ${htmlFile.name}, College: ${collegeId}, Hash: ${contentHash}`);

    // Check for duplicate document
    const existingDoc = await prisma.collegeDocument.findFirst({
      where: { collegeId, dataSourceId, academicYear, contentHash }
    });

    if (existingDoc && !override) {
      console.log(`[Upload] Document already exists with ID: ${existingDoc.id}`);
      return NextResponse.json({ 
        message: 'A similar document already exists for this college, source, and year.', 
        duplicate: true,
        documentId: existingDoc.id
      }, { status: 409 });
    }

    if (existingDoc && override) {
      console.log(`[Upload] Overriding existing document: ${existingDoc.id}`);
      await prisma.collegeDocument.delete({ where: { id: existingDoc.id } });
    }

    // Validate DataSource
    const dataSource = await prisma.dataSource.findUnique({
      where: { id: dataSourceId }
    });

    if (!dataSource) {
      return NextResponse.json({ error: `Invalid Data Source ID: '${dataSourceId}'` }, { status: 400 });
    }

    // Save document
    const document = await prisma.collegeDocument.create({
      data: {
        collegeId,
        dataSourceId,
        academicYear,
        content: fileContent,
        contentHash,
        contentType: htmlFile.type || (documentType === 'html' ? 'text/html' : 'application/octet-stream'),
        fileSize: htmlFile.size,
        uploadedByUserId: session.user.id
      }
    });

    console.log(`[Upload] Saved successfully. ID: ${document.id}`);

    return NextResponse.json({ 
      message: 'Document uploaded successfully and pending extraction', 
      documentId: document.id,
      extractionStatus: 'pending'
    });

  } catch (error: any) {
    console.error('Error in college document upload:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
