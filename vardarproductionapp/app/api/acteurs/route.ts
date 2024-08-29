import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("Campagnes");

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '8', 10);

    const skip = (page - 1) * limit;
    const take = limit;

    const [acteurs, total] = await Promise.all([
      prisma.acteur.findMany({
        skip,
        take,
      }),
      prisma.acteur.count(),
    ]);

    return NextResponse.json({ acteurs, total });
  } catch (error) {
    console.error('Error fetching acteurs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
        nom,
        prenom,
        dateNaissance,
        nationalite,
        bio,
        spectacleIds,
     } = body;

    if (!nom || !prenom || !nationalite ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newTheatre = await prisma.acteur.create({
      data: {
        nom,
        prenom,
        dateNaissance: dateNaissance,
        nationalite,
        bio,
        spectacleIds:spectacleIds? spectacleIds : [],
      },
    });

    return NextResponse.json(newTheatre, { status: 201 });
  } catch (error) {
    console.error('Error creating campagne:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
