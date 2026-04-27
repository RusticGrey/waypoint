import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sources = await prisma.rankingSource.findMany({
      where: { isActive: true },
      orderBy: { displayName: "asc" },
    });
    return NextResponse.json(sources);
  } catch (error) {
    console.error("Failed to fetch ranking sources:", error);
    return NextResponse.json(
      { error: "Failed to fetch ranking sources" },
      { status: 500 }
    );
  }
}
