import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const acteurs = await prisma.acteur.findMany();
    return NextResponse.json(acteurs);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
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
