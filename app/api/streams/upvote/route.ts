import { prismaclient } from '@/app/lib/db';
import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSchema = z.object({
  streamId: z.string(),
  spaceId: z.string(),
});

export async function POST(req: NextRequest) {
  // Ensure you provide the `authOptions` to `getServerSession`
  const session = await getServerSession(handler);

  if (!session?.user) {
    return NextResponse.json(
      {
        message: "Unauthenticated",
      },
      {
        status: 403,
      }
    );
  }
  
  const user = session.user;

  try {
    const data = UpvoteSchema.parse(await req.json());
    await prismaclient.upvote.create({
      data: {
        userId: user.id,
        streamId: data.streamId,
      },
    });
    return NextResponse.json({
      message: "Done!",
    });
  } catch (e) {
    console.error(e); // Log the error for debugging
    return NextResponse.json(
      {
        message: "Error while upvoting",
      },
      {
        status: 400, // Use 400 for bad request instead of 403 for errors
      }
    );
  }
}
