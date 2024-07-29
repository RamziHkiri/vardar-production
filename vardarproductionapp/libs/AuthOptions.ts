import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "../libs/prismadb"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid email or password")
                }
                const user = await prismadb.user.findFirst({
                    where: { email: credentials.email },
                })
                if (!user || !user.hashedPassword || user.id) {
                    throw new Error("User not registred yet")
                }
                const  currentHashedPassword = await bcrypt.hash(credentials.password,12);
                if(currentHashedPassword!== user.hashedPassword){
                    throw new Error("Invalid credentials")
                }

                return user;
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy: "jwt"
    },
    debug: process.env.NODE_ENV !== "production"
}    