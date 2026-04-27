import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import crypto from "crypto";

const uploadRequestSchema = z.object({
  collegeId: z.string(),
  academicYear: z.string(),
  rankingSourceId: z.string(),
  documents: z.array(
    z.object({
      fileName: z.string().min(1),
      rawHtmlContent: z.string(),
      mimeType: z.string().optional().default("text/html"),
      documentType: z.string().optional().default("html"),
    })
  ).min(1),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, role: true },
    });

    if (!user || user.role !== "counselor") {
      return NextResponse.json(
        { error: "Only counselors can upload documents" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { collegeId, academicYear, rankingSourceId, documents } =
      uploadRequestSchema.parse(body);

    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    const rankingSource = await prisma.rankingSource.findUnique({
      where: { id: rankingSourceId },
    });

    if (!rankingSource) {
      return NextResponse.json(
        { error: "Ranking source not found" },
        { status: 404 }
      );
    }

    const results = await Promise.all(
      documents.map(async (doc) => {
        const htmlHash = crypto.createHash("sha256").update(doc.rawHtmlContent).digest("hex");
        
        // Comprehensive duplicate check: collegeId + sourceType + (htmlHash OR fileName)
        const existing = await prisma.collegeDocument.findFirst({
          where: { 
            collegeId, 
            sourceType: rankingSource.name,
            OR: [
              { htmlHash },
              { metadata: { path: ['fileName'], equals: doc.fileName } }
            ]
          }
        });

        if (existing) {
          return { skipped: true, fileName: doc.fileName, id: existing.id, extractionStatus: existing.extractionStatus, metadata: existing.metadata };
        }

        const newDoc = await prisma.collegeDocument.create({
          data: {
            collegeId,
            section: "General",
            sourceType: rankingSource.name,
            rawHtmlContent: doc.rawHtmlContent,
            htmlHash,
            uploadedByUserId: user.id,
            extractionStatus: "pending",
            documentType: doc.documentType || "html",
            metadata: {
              fileName: doc.fileName,
              mimeType: doc.mimeType,
              academicYear: academicYear,
              rankingSourceId: rankingSourceId
            }
          },
          select: {
            id: true,
            collegeId: true,
            documentType: true,
            extractionStatus: true,
            metadata: true
          },
        });

        return { ...newDoc, skipped: false, fileName: doc.fileName };
      })
    );

    const uploadedDocuments = results.filter(r => !r.skipped);
    const skippedDocuments = results.filter(r => r.skipped);

    return NextResponse.json(
      {
        success: true,
        message: `Processed ${results.length} document(s)`,
        uploadedDocuments: uploadedDocuments.map(doc => ({
          ...doc,
          fileName: (doc.metadata as any)?.fileName || doc.fileName,
          academicYear: academicYear,
          approvalStatus: doc.extractionStatus
        })),
        skippedCount: skippedDocuments.length,
        skippedFiles: skippedDocuments.map(s => s.fileName)
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload API error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid request format",
          details: (error as any).errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to upload documents" },
      { status: 500 }
    );
  }
}
