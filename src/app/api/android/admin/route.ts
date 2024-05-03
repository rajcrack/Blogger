import prisma from '@/lib/global/prisma';
import { NextResponse } from 'next/server';
import { createAdminSchema } from './admin.validator';
import { date } from 'zod';

export async function POST(request: Request) {
    try {
        const values = new URL(request.url).searchParams;
        const sec = values.get('loggedIn');
        const body = await request.json();
        const validate = createAdminSchema.safeParse(body);
        if (!validate.success) {
            console.log("Demo error");
            return NextResponse.json({ error: validate.error, message: validate.data }, {
                status: 404
            });
        }
        if (sec == 'true') {
            const { userName, password } = body;

            const userToBeCreated = await prisma.admin.create({
                data: {
                    username: userName,
                    password: password
                }
            });
            return NextResponse.json({
                data: userToBeCreated
            });
        }
        const { userName, password } = body;
        const userFind = await prisma.admin.findFirst({
            where: {
                isActive: true,
                username: userName,
                password: password
            },
            select: {
                id: true,
                username: true,
                isActive: true
            }
        });
        if (!userFind) {
            return NextResponse.json({
                error: "admin Not found"
            }, {
                status: 401, statusText: "Not Found Admin"
            });
        }

        return NextResponse.json({
            data: userFind
        });
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 405 });
    }
}


