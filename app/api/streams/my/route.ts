import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import {prismaclient} from '@/app/lib/db';

export async function GET(request: Request) {
  const session = await getSession();
  const user = session?.user as { 
    id: string; name?: string | null; email?: string | null; image?: string | null };

  if (!user) {
    return NextResponse.json({
      message: "Unauthorized"
    }, {
      status: 403
    });
  }

  const streams = await prismaclient.stream.findMany({
    where: {
      userId: user.id,
    },
    include: {
      _count: {
        select: {
          upvotes: true,
        },
      },
      upvotes: {
        where: {
          userId: user.id,
        },
      },
    },
  });
  
  return NextResponse.json({
    streams: streams.map(({_count, ...rest}) => ({
      ...rest,
      upvotes: _count.upvotes,
      haveupvoted:rest.upvotes.length > 0,
    })),
  });
}