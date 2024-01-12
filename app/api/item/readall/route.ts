import { NextResponse } from "next/server"
import { connectDB } from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"

export async function GET(request: Request) {
    try {
        await connectDB()
        const allItems = await ItemModel.find()
        return NextResponse.json({ message: "アイテム読み取り(オール)成功", allItems })
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "アイテム読み取り(オール)失敗" })
    }
}
