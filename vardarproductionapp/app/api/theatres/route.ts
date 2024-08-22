import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    console.log("Campagnes");
    try {
      const campagnes = await prisma.theatre.findMany();
      return NextResponse.json(campagnes);
    } catch (error) {
      console.error('Error fetching theatre:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }

  export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { nom, lieux, capacite } = body;
  
      if (!nom || !lieux || !capacite) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      const newCampagne = await prisma.theatre.create({
        data: {
          nom,
          lieux,
          capacite,
        },
      });
  
      return NextResponse.json(newCampagne, { status: 201 });
    } catch (error) {
      console.error('Error creating campagne:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }