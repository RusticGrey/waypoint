import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { GeminiExtractor } from '@/lib/scraping/llm/geminiExtractor';
import crypto from 'crypto';
const pdf = require('pdf-parse');

// Configure segments for parsing large PDF buffers
export const config = {
  api: {
    bodyParser: false, // Handle manual body parsing if needed for large PDFs
  },
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'counselor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const collegeId = formData.get('collegeId') as string;
    const section = formData.get('section') as string || 'generic';
    const sourceType = formData.get('sourceType') as string || 'all';
    const documentType = formData.get('documentType') as string || 'html';
    const htmlFile = formData.get('file') as File;

    if (!collegeId || !htmlFile) {
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

    const htmlHash = crypto.createHash('sha256').update(fileContent).digest('hex');

    console.log(`[Upload] Saving file: ${htmlFile.name}, College: ${collegeId}, Hash: ${htmlHash}`);

    // Check for duplicate document
    const existingDoc = await (prisma as any).collegeDocument.findFirst({
      where: { collegeId, htmlHash }
    });

    if (existingDoc) {
      console.log(`[Upload] Document already exists with ID: ${existingDoc.id}`);
      return NextResponse.json({ 
        message: 'Document already exists', 
        documentId: existingDoc.id,
        extractionStatus: existingDoc.extractionStatus
      });
    }

    // Validate RankingSource
    const rankingSource = await (prisma as any).rankingSource.findFirst({
      where: { name: sourceType }
    });

    if (!rankingSource) {
      return NextResponse.json({ error: `Invalid Data Source: '${sourceType}' is not a registered RankingSource.` }, { status: 400 });
    }

    // Get active prompt to attach
    const activePrompt = await (prisma as any).rankingSourcePrompt.findFirst({
      where: { rankingSourceId: rankingSource.id, isActive: true },
      orderBy: { version: 'desc' }
    });

    if (!activePrompt) {
      console.warn(`[Upload] No active prompt found for source: ${sourceType}. Document will be pending extraction without promptId.`);
    }

    // Extract data using LLM
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_AI_API_KEY not configured');
    }

    // WE NO LONGER EXTRACT ON UPLOAD PER USER FEEDBACK
    let extractedData = null;
    let extractionStatus = 'pending';

    // Save document
    console.log(`[Upload] Saving document to DB with status: ${extractionStatus}`);

    // Save document
    const document = await (prisma as any).collegeDocument.create({
      data: {
        collegeId,
        section,
        sourceType,
        documentType,
        rawHtmlContent: fileContent,
        htmlHash,
        extractedData: null,
        extractionStatus: 'pending',
        extractedAt: null,
        uploadedByUserId: session.user.id,
        promptId: activePrompt?.id || null,
        metadata: {
          fileName: htmlFile.name,
          fileSize: htmlFile.size,
          contentType: htmlFile.type
        } as any
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
