import prisma from '@/lib/global/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { createPostSchema } from './post.validation';
import { error } from 'console';
import { date } from 'zod';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validate = createPostSchema.safeParse(body);
        if (!validate.success) {
            return NextResponse.json({
                error: validate.error,
                message: validate.data
            });
        }
        const { title, subtitle, message, image, isActive, tags } = body;
        let submittedTags = "";
        tags.forEach((element: any) => {
            submittedTags += `${element},`;
        });
        const postInserted = await prisma.post.create({
            data: {
                title,
                subtitle,
                message,
                image,
                isActive,
                tags: submittedTags
            }
        });

        return NextResponse.json({ message: 'POST request success', data: postInserted });
    } catch (error) {
        return NextResponse.json({ message: 'error ' + error });
    }
}


export async function GET(request: NextRequest) {
    try {
        const path = new URL(request.url);
        const values = path.searchParams;
        const params = values.get('type');
        if (params === "list") {
            const page = values.get('page');

            const old = 10 * Number(page);

            const [postList, count] = await prisma.$transaction([
                prisma.post.findMany({
                    where: {
                        isActive: true
                    },
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
                prisma.post.count({
                    where: {
                        isActive: true
                    }
                })
            ]);


            return NextResponse.json({ message: 'GET request success', data: { count, postList } });
        }
        const id: any = values.get('id');
        if (id !== null) {
            const post = await prisma.post.findFirst({
                where: {
                    id: id
                }
            });

            if (!post) {
                return NextResponse.json({
                    error: "Post Not Found"
                }, { status: 400, statusText: "Not Found" });
            }
            return NextResponse.json({ data: post });
        }
        return NextResponse.json({
            data: "Unknown"
        });
    } catch (error) {
        return NextResponse.json({
            error
        }, {
            status: 404
        });
    }
}