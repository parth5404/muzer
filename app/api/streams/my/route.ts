import { z } from "zod";
import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import { prismaclient } from "@/app/lib/db";

export default async function GET() {
  const session = await getServerSession();
         const user =await prismaclient.user.findUnique({
             where:{
                 email:  session?.user?.email??""  
             }
         });
         if(!user){
            return NextResponse.json({
                message: "Unauthorized"
            }, {
                status: 403
            }); 
        }
        //if user exists find the stream for the user
        const streams=await prismaclient.stream.findMany({
            where:{
                userId:user.id
            }
        });
        return NextResponse.json({
            streams
        });
}