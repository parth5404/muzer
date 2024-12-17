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
      ]
})

export { handler as GET, handler as POST }