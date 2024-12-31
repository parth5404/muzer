import { z } from "zod";
import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";
import { prismaclient } from "@/app/lib/db";

const upvoteSchema=z.object({
    streamId:z.string(),
})
export async function POST(req: NextRequest) {
    
        
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
        //2 baar vote nhi kare uska check
        try{
            const data = upvoteSchema.parse(await req.json());
            await prismaclient.upvote.delete({
                where:{
                    userId_streamId:{
                        userId:user.id,
                        streamId:data.streamId
                    }
                }
                           }); // Deleting the upvote
                           return NextResponse.json({
                               message: "Downvoted successfully" });
        }
        catch(e){
            return NextResponse.json({
                message: "Error while upvoting"
            }, {
                status: 403
            });
        }
    }