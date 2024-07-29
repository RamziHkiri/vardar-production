import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prismadb from "@/libs/prismadb";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return new NextResponse("Missing email or password", { status: 500 });
        }
        const userExists = await prisma.user.findFirst({
            where: {
                email: email,
            },
        })
        if (!userExists?.id) {
            return new NextResponse("User already exists", { status: 500 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await prismadb.user.create({
            data: {
                email: email,
                hashedPassword: hashedPassword,
            },
        });
        return NextResponse.json(newUser);
    } catch (error: any) {
        console.error("Register_err:" + error)
        return new NextResponse(error, { status: 500 });
    }
}