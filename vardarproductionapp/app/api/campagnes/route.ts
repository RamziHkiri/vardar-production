import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
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