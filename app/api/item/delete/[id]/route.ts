import { NextResponse } from "next/server"
import { connectDB } from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"

export async function DELETE(request: Request, context) {
    const reqBody = await request.json()
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(context.params.id)
        if (singleItem.email === reqBody.email) {
            await ItemModel.deleteOne({ _id: context.params.id })
            return NextResponse.json({ message: "アイテム削除成功" })
        } else {
            return NextResponse.json({ message: "他人のアイテムである" })
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "アイテム削除失敗" })
    }
}
