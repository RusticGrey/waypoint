import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const glossarySchema = z.object({
  term: z.string().min(1),
  expansion: z.string().min(1),
  category: z.string().optional().default("general"),
  context: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'counselor') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const glossary = await (prisma as any).knowledgeGlossary.findMany({
      orderBy: { term: 'asc' }
    });

    return NextResponse.json(glossary);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch glossary" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'counselor') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = glossarySchema.parse(body);

    const term = await (prisma as any).knowledgeGlossary.upsert({
      where: { term: validated.term },
      update: {
        expansion: validated.expansion,
        category: validated.category,
        context: validated.context
      },
      create: {
        term: validated.term,
        expansion: validated.expansion,
        category: validated.category,
        context: validated.context
      }
    });

    return NextResponse.json(term);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to save glossary term" }, { status: 500 });
  }
}
