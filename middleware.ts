import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request) {
    const token = request.headers.get("Authorization")
    if (!token) {
        return NextResponse.json({ message: "トークンなし" })
    }
    try {
        const key = process.env.JWT_SECRET_KEY
        const secretKey = new TextEncoder().encode(key)
        const decodedJwt = await jwtVerify(token, secretKey)
        console.log(decodedJwt)
        return NextResponse.next()
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "トークン誤り" })
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/api/item/create",
        "/api/item/update/:path*",
        "/api/item/delete/:path*",
    ],
}