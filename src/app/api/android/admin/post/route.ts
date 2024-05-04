import prisma from '@/lib/global/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { updatePostSchemaDelete } from '../admin.validator';
import { NextURL } from 'next/dist/server/web/next-url';


export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {

        const path = request.nextUrl;

        const values = path.searchParams;

        const page = values.get('page');

        const old = 10 * Number(page);

        const [postList, count] = await prisma.$transaction([
            prisma.post.findMany({
                select: {
                    image: true,
                    title: true,
                    subtitle: true,
                    createdAt: true,
                    isActive: true,
                    message: true,
                    id: true,
                    tags: true
                },
                skip: old,
                take: 10
            }),
            prisma.post.count()
        ]);


        return NextResponse.json({ message: 'GET request success', data: { count, postList } });
    } catch (error) {
        return NextResponse.json({
            error
        }, {
            status: 300
        });
    }
}



export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const validate = updatePostSchemaDelete.safeParse(body);
        if (!validate.success) {
            return NextResponse.json({ error: validate.error, message: validate.data }, { status: 404, statusText: "dATA Not given." });
        }
        const { id, isActive } = body;

        const post = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                isActive: isActive
            }
        });

        return NextResponse.json({ message: 'POST request success' });
    } catch (error) {
        return NextResponse.error();
    }
}