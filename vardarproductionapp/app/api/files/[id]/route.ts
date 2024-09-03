import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
export async function PUT(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
  
    try {
      const body = await req.json();
      const {
        pays,
        ville,
        fileURL,
      } = body;
  
      const updatedCampagne = await prisma.fichierProspects.update({
        where: { id: id },
        data: {
            pays,
            ville,
            fileURL,
        },
      });
  
      return NextResponse.json(updatedCampagne, { status: 200 });
    } catch (error) {
      console.error('Error updating campagne:', error);
      return NextResponse.json({ error: 'Failed to update campagne' }, { status: 500 });
    }
  }