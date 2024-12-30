
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import { prismaclient } from "@/app/lib/db";
const youtubesearchapi = require("youtube-search-api");

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
     const res=await  youtubesearchapi.GetVideoDetails(extractedId);
     console.log(res.title);
     const tb=res.thumbnail.thumbnails;
     tb.sort((a:{width:number},b:{width:number})=>a.width<b.width ? 1 : -1);
       const stream= await prismaclient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: res.title??"can't find video title",
                addedBy: data.creatorId ,// Adding the missing 'addedBy' field
                smallImg:tb.length>1?tb[tb.length-2].url:tb[tb.length-1].url??"",
                bigImg:tb[tb.length-1].url??""

            }
        });

        return NextResponse.json({
            message: "Stream added successfully",
            id: stream.id
        }, {
            status: 201
        });
    } catch (e) {
        console.log(e);
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