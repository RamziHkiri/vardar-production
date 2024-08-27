import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("Campagnes");

  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '8', 10);

    // Calculate skip and take for pagination
    const skip = (page - 1) * limit;
    const take = limit;

    // Fetch paginated campagnes from the database
    const [campagnes, total] = await Promise.all([
      prisma.campagne.findMany({
        skip,
        take,
      }),
      prisma.campagne.count(),
    ]);

    // Return the campagnes data along with the total count
    return NextResponse.json({ campagnes, total });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, lieux, dateDebut, dateFin, theatreId, prix, status } = body;



    const newCampagne = await prisma.campagne.create({
      data: {
        nom,
        lieux,
        dateDebut: dateDebut,
        dateFin: dateFin,
        theatreId,
        prix,
        status:status? status :'success',
      },
    });

    return NextResponse.json(newCampagne, { status: 201 });
  } catch (error) {
    console.error('Error creating campagne:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}