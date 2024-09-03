import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("files");

  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '8', 10);

    // Calculate skip and take for pagination
    const skip = (page - 1) * limit;
    const take = limit;

    // Fetch paginated campagnes from the database
    const [files, total] = await Promise.all([
      prisma.fichierProspects.findMany({
        skip,
        take,
      }),
      prisma.fichierProspects.count(),
    ]);

    // Return the campagnes data along with the total count
    return NextResponse.json({ files, total });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pays, ville, fileURL } = body;



    const newFile = await prisma.fichierProspects.create({
      data: {
        pays, 
        ville, 
        fileURL: fileURL? fileURL:'later',
      },
    });

    return NextResponse.json(newFile, { status: 201 });
  } catch (error) {
    console.error('Error creating file:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

