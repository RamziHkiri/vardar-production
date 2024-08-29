import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("Spectacles");

  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '8', 10);

    // Calculate skip and take for pagination
    const skip = (page - 1) * limit;
    const take = limit;

    // Fetch paginated campagnes from the database
    const [spectacles, total] = await Promise.all([
      prisma.spectacle.findMany({
        skip,
        take,
      }),
      prisma.spectacle.count(),
    ]);

    // Return the campagnes data along with the total count
    return NextResponse.json({ spectacles, total });
  } catch (error) {
    console.error('Error fetching spectacles:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

  export async function POST(req: Request) {
    try {
      const body = await req.json();
      const {titre, description, acteurId } = body;
  
      if (!titre || !description) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      const newSpectacle = await prisma.spectacle.create({
        data: {
          titre,
          description,
          acteurId
        },
      });
  
      return NextResponse.json(newSpectacle, { status: 201 });
    } catch (error) {
      console.error('Error creating spectacle:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }