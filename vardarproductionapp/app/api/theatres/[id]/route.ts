import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const theatre = await prisma?.theatre.delete({
    where: { id: params.id },
  });
  return NextResponse.json(theatre);
}
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extracting the ID from the URL

  try {
    const body = await req.json();
    const {
        nom,
        adresse,
        capacite,
    } = body;

    const updatedCampagne = await prisma.theatre.update({
      where: { id: id },
      data: {
        nom,
        adresse,
        capacite,
      },
    });

    return NextResponse.json(updatedCampagne, { status: 200 });
  } catch (error) {
    console.error('Error updating campagne:', error);
    return NextResponse.json({ error: 'Failed to update campagne' }, { status: 500 });
  }
}
