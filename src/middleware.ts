import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
    const auth = request.headers.get("authorization");
    console.log("auth ", auth);
    if (auth === 'Bearer bloggingApplication') {
        return NextResponse.next();
    }
    return NextResponse.json({
        message: "You are not Autorized to use these services."
    }, {
        status: 401,
        statusText: "Unknown User"
    });
}
export const config = {
    matcher: '/api/:path*',
}