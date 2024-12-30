import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import {prismaclient} from '@/app/lib/db';
import { getServerSession } from 'next-auth';

export async function GET(request: Request) {
 const session= await getServerSession();
 const user=await prismaclient.user.findUnique({
    where:{
        email:session?.user?.email ?? ""
    }
 });
if(!user){
  return NextResponse.json({
        message:"user not found"
    },{
        status:404
    })
}
const streams = await prismaclient.stream.findMany({
  where: {
      userId: user.id??"",
  }
});
return NextResponse.json({
message: "Streams fetched successfully",
streams
}, {
status: 200
});
}