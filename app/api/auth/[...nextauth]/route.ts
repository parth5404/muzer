import { prismaclient } from "@/app/lib/db";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
//  export function GET(request: Request) {
//     return NextResponse.json({ message: "Hello World" })
// }

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) {
        return false;
      }
      
      try {
        const newUser = await prismaclient.user.create({
          data: {
            email: user.email,
            name: user.name,
            provider: "Google",
          }
        });
        
        console.log("Created user:", newUser);
        return true;
      } catch (e) {
        // Check if user already exists
        const existingUser = await prismaclient.user.findUnique({
          where: {
            email: user.email
          }
        });
        
        if (existingUser) {
          console.log("User already exists:", existingUser);
          return true;
        }
        
        console.log("Error creating user:", e);
        return false;
      }
    }
  }
});
export { handler as GET, handler as POST }