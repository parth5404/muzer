import { NextResponse } from 'next/server';
import { prismaclient } from '@/app/lib/db';
import { getServerSession } from 'next-auth';

export async function GET(request: Request) {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prismaclient.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const streams = await prismaclient.stream.findMany({
        where: { userId: user.id },
        include: {
            _count: {
                select: { upvotes: true }
            },
            upvotes: {
                where: { userId: user.id }
            }
        }
    });

    return NextResponse.json({
        streams: streams.map(({_count, ...rest}) => ({
            ...rest,
            upvotes: _count.upvotes,
            haveupvoted: rest.upvotes.length > 0
        }))
    });
}
