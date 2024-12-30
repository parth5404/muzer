import { prismaclient } from "@/app/lib/db";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      
      try {
        const existingUser = await prismaclient.user.findUnique({
          where: { email: user.email }
        });

        if (existingUser) {
          return true;
        }

        await prismaclient.user.create({
          data: {
            email: user.email,
            name: user.name,
            provider: "Google",
          }
        });
        
        return true;
      } catch (error) {
        console.error("Auth error:", error);
        return false;
      }
    }
  }
});

export { handler as GET, handler as POST }
