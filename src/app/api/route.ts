import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        return NextResponse.json({ message: 'GET request success' });
    } catch (error) {
        return NextResponse.json({ message: 'GET request failed' });
    }
}