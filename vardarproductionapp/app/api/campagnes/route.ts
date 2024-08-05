import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

{/*export async function POST(req: Request, res: Response){
  const { nom, dateDebut, dateFin } = await req.json();
  const newCampagne = await prismadb.campagne.create({
    data: { nom, dateDebut, dateFin },
  });
  return new Response(JSON.stringify(newCampagne), { status: 201 });
}*/}

// Get all campagnes
export async function GET(req: Request) {
  console.log("Campagnes");
  try {
    const campagnes = await prisma.campagne.findMany();
    return NextResponse.json(campagnes);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nom, dateDebut, dateFin } = body;

    if (!nom || !dateDebut || !dateFin) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newCampagne = await prisma.campagne.create({
      data: {
        nom,
        dateDebut,
        dateFin,
      },
    });

    return NextResponse.json(newCampagne, { status: 201 });
  } catch (error) {
    console.error('Error creating campagne:', error);
    return NextResponse.json({ error: 'Internal Server Error'}, { status: 500 });
  }
}


