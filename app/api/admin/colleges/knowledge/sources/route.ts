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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, displayName, baseUrl } = body;

    if (!name || !displayName) {
      return NextResponse.json({ error: "Name and Display Name are required" }, { status: 400 });
    }

    const source = await prisma.dataSource.create({
      data: {
        id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name,
        displayName,
        baseUrl: baseUrl || "",
        isActive: true,
      }
    });

    return NextResponse.json(source);
  } catch (error: any) {
    console.error("Failed to create data source:", error);
    return NextResponse.json(
      { error: "Failed to create data source" },
      { status: 500 }
    );
  }
}
