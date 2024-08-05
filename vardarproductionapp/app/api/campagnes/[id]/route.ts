import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const campagne = await prismadb.campagne.findUnique({
      where: { id:id },
    });

    if (!campagne) {
      return NextResponse.json({ error: "Campagne not found" }, { status: 404 });
    }

    return NextResponse.json(campagne);
  } catch (error) {
    console.error('Error fetching campagne:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
