import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import crypto from "crypto";

const uploadRequestSchema = z.object({
  collegeId: z.string(),
  academicYear: z.string(),
  dataSourceId: z.string(),
  documents: z.array(
    z.object({
      fileName: z.string().min(1),
      content: z.string(),
      contentType: z.string().optional().default("text/html"),
    })
  ).min(1),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check session role first
    if (session.user.role !== 'counselor') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Still need user id for the create operation
    const userId = session.user.id;

    const body = await req.json();
    
    // Zod parsing will catch most issues
    let parsed;
    try {
      parsed = uploadRequestSchema.parse(body);
    } catch (err: any) {
      console.error("[Upload API] Zod Error:", err.errors);
      return NextResponse.json({ error: "Invalid request format", details: err.errors }, { status: 400 });
    }

    const { collegeId, academicYear, dataSourceId, documents } = parsed;

    if (!collegeId || !dataSourceId || !academicYear) {
      return NextResponse.json({ error: "Missing required fields: collegeId, dataSourceId, and academicYear are all required." }, { status: 400 });
    }

    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    const dataSource = await prisma.dataSource.findUnique({
      where: { id: dataSourceId },
    });

    if (!dataSource) {
      return NextResponse.json(
        { error: "Data source not found" },
        { status: 404 }
      );
    }

    const results = await Promise.all(
      documents.map(async (doc) => {
        const contentHash = crypto.createHash("sha256").update(doc.content).digest("hex");
        
        const existing = await prisma.collegeDocument.findFirst({
          where: { 
            collegeId, 
            dataSourceId,
            academicYear,
            contentHash
          }
        });

        if (existing) {
          return { skipped: true, fileName: doc.fileName, id: existing.id };
        }

        const newDoc = await prisma.collegeDocument.create({
          data: {
            collegeId,
            dataSourceId,
            academicYear,
            content: doc.content,
            contentHash,
            fileName: doc.fileName,
            uploadedByUserId: userId,
            contentType: doc.contentType || "text/html",
          }
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
        uploadedDocuments: uploadedDocuments,
        skippedCount: skippedDocuments.length,
        skippedFiles: skippedDocuments.map(s => s.fileName)
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload documents" }, { status: 500 });
  }
}
