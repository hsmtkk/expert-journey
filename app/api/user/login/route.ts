import { NextResponse } from "next/server"
import { connectDB } from "@/app/utils/database"
import { UserModel } from "@/app/utils/schemaModels"
import { SignJWT } from "jose"

const SECRET_KEY = "fcb72196-264f-4cd2-bf0b-a7411e833ef8"

export async function POST(request: Request) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const savedUser = await UserModel.findOne({ email: reqBody.email })
        if (savedUser) {
            if (reqBody.password === savedUser.password) {
                const payload = { email: reqBody.email }
                const secretKey = new TextEncoder().encode(SECRET_KEY)
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
