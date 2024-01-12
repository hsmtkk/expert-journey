import { NextResponse } from "next/server"
import { connectDB } from "@/app/utils/database"
import { UserModel } from "@/app/utils/schemaModels"
import { SignJWT } from "jose"

export async function POST(request: Request) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const savedUser = await UserModel.findOne({ email: reqBody.email })
        if (savedUser) {
            if (reqBody.password === savedUser.password) {
                const payload = { email: reqBody.email }
                const key = process.env.JWT_SECRET_KEY
                const secretKey = new TextEncoder().encode(key)
                const token = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1d").sign(secretKey)
                return NextResponse.json({ message: "ログイン成功", token })
            } else {
                return NextResponse.json({ message: "ログイン失敗、パスワード誤り" })
            }
        } else {
            return NextResponse.json({ message: "ログイン失敗、ユーザーなし" })
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "ログイン失敗" })
    }
}
