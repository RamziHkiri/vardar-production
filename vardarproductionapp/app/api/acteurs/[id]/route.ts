import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const campagne = await prisma?.acteur.delete({
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
        nom,
        prenom,
        dateNaissance,
        nationalite,
        bio,
        spectacleIds,
     } = body;

    const updatedActeur = await prisma.acteur.update({
      where: { id: id },
      data: {
        nom,
        prenom,
        dateNaissance,
        nationalite,
        bio,
        spectacleIds,
      },
    });

    return NextResponse.json(updatedActeur, { status: 200 });
  } catch (error) {
    console.error('Error updating acteur:', error);
    return NextResponse.json({ error: 'Failed to update acteur' }, { status: 500 });
  }
}
