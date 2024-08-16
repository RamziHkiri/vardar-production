import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      const spectacles = await prisma.spectacle.findMany();
      return NextResponse.json(spectacles);
    } catch (error) {
      console.error('Error fetching theatre:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }

  export async function POST(req: Request) {
    try {
      const body = await req.json();
      const {titre, description, acteurId } = body;
  
      if (!titre || !description) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }
  
      const newSpectacle = await prisma.spectacle.create({
        data: {
          titre,
          description,
          acteurId
        },
      });
  
      return NextResponse.json(newSpectacle, { status: 201 });
    } catch (error) {
      console.error('Error creating spectacle:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }