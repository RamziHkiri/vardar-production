import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const campagne = await prisma?.spectacle.delete({
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
        titre,
        description,
        acteurId
    } = body;

    const updatedCampagne = await prisma.spectacle.update({
      where: { id: id },
      data: {
        titre,
        description,
        acteurId 
      },
    });

    return NextResponse.json(updatedCampagne, { status: 200 });
  } catch (error) {
    console.error('Error updating spectacle:', error);
    return NextResponse.json({ error: 'Failed to update spectacle' }, { status: 500 });
  }
}
