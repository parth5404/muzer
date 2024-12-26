
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import { prismaclient } from "@/app/lib/db";
//const ytregex=new RegExp("http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?");
const ytregex = new RegExp("http(?:s?)://(?:www\\.)?youtu(?:be\\.com/watch\\?v=|\\.be/)([-\\w]{11})(?:\\S+)?");

const createSchema=z.object({
    creatorId:z.string(),
    url:z.string(),
    
})
export async function POST(req: NextRequest) {
    try {
        const data = createSchema.parse(await req.json());
        const isYt = ytregex.test(data.url);
        if (!isYt) {
            return NextResponse.json({
                message: "Wrong yt url format"
            }, {
                status: 411
            });
        }
        
        const extractedId = data.url.split("?v=")[1];
       const stream= await prismaclient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",
                addedBy: data.creatorId // Adding the missing 'addedBy' field
            }
        });

        return NextResponse.json({
            message: "Stream added successfully",
            id: stream.id
        }, {
            status: 201
        });
    } catch (e) {
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 411
        });
    }
}


export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prismaclient.stream.findMany({
        where: {
            userId: creatorId??"",
        }
    });
return NextResponse.json({
    message: "Streams fetched successfully",
    streams
}, {
    status: 200
});
}