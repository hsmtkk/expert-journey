import { NextResponse } from "next/server"
import { connectDB } from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"

export async function POST(request: Request) {
    const reqBody = await request.json()
    try {
        await connectDB()
        await ItemModel.create(reqBody)
        return NextResponse.json({ message: "アイテム作成成功" })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "アイテム作成失敗" })
    }
}
