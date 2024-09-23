import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("Fetching all prospects");

  try {
    // Fetch all prospects from the database
    const prospects = await prisma.prospect.findMany();

    // Return the fetched prospects data
    return NextResponse.json({ prospects });
  } catch (error) {
    console.error('Error fetching Prospects:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
  
    const body = await req.json();
    const { nom, prenom, email, telephone, lieux } = body;

    const newProspect = await prisma.prospect.create({
      data: {
        nom,
        prenom,
        email,
        telephone,
        lieux,
      },
    });

    return NextResponse.json(newProspect, { status: 201 });
  } catch (error) {
    console.error('Error creating prospect:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}