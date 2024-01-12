import { NextResponse } from "next/server"
import { connectDB } from "@/app/utils/database"
import { UserModel } from "@/app/utils/schemaModels"

export async function POST(request: Request) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const savedUser = await UserModel.findOne({ email: reqBody.email })
        if (savedUser) {
            if (reqBody.password === savedUser.password) {
                return NextResponse.json({ message: "ログイン成功" })
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
