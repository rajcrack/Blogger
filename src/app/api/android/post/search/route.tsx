import prisma from '@/lib/global/prisma';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { title } from 'process';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const query = searchParams.get("query");
        const take = searchParams.get("limit");
        if (!query) {
            return NextResponse.json({ message: 'Please provide a query' }, { status: 201, statusText: "query not found" });
        }

        const postList = await prisma.post.findMany({
            where: {
                isActive: true,
                OR: [{
                    title: { search: query },
                    tags: { search: query },
                }
                ]
            },
            select: {
                id: true,
                title: true,
                subtitle: true,
                image: true,
                tags: true
            },
            take: Number(take)
        });

        // Your GET request handling logic here
        return NextResponse.json({
            postList,
            message: 'GET request success'
        });
    } catch (error) {
        return NextResponse.json({
            error,
            message: "something went wrong"
        });
    }
}