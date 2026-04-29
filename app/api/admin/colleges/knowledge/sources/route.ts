import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sources = await prisma.dataSource.findMany({
      where: { isActive: true },
      orderBy: { displayName: "asc" },
    });
    return NextResponse.json(sources);
  } catch (error) {
    console.error("Failed to fetch data sources:", error);
    return NextResponse.json(
      { error: "Failed to fetch data sources" },
      { status: 500 }
    );
  }
}
