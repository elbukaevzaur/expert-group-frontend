import { NextRequest, NextResponse } from 'next/server'
import {authStorageKey} from "@/lib/config";

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const token = req.cookies.get(authStorageKey);

    if (path.startsWith("/lk") && !token?.value) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }else if (path === "/lk"){
        return NextResponse.rewrite(new URL('/lk/current-orders', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}