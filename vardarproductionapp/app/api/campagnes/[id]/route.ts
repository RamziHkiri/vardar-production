import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const campagne = await prisma?.campagne.delete({
    where: { id: params.id },
  });
  return NextResponse.json(campagne);
}
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  try {
    const body = await req.json();
    const {
      lieux,
      nom,
      dateDebut,
      dateFin,
      theatreId,
      prix,
      status,
    } = body;

    const updatedCampagne = await prisma.campagne.update({
      where: { id: id },
      data: {
        lieux,
        nom,
        dateDebut: dateDebut ? new Date(dateDebut) : null,
        dateFin: dateFin ? new Date(dateFin) : null,
        theatreId,
        prix,
        status,
      },
    });

    return NextResponse.json(updatedCampagne, { status: 200 });
  } catch (error) {
    console.error('Error updating campagne:', error);
    return NextResponse.json({ error: 'Failed to update campagne' }, { status: 500 });
  }
}
