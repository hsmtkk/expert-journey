import React from "react"
import Image from "next/image"
import Link from "next/link"

const getSingleItem = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`)
    const jsonResponse = await response.json()
    return jsonResponse.singleItem
}

const ReadSingleItem = async (context) => {
    const singleItem = await getSingleItem(context.params.id)
    console.log(singleItem)
    return (
        <div>
            <Image src={singleItem.image} width={750} height={500} alt={singleItem.title} />
            <h1>{singleItem.title}</h1>
            <h2>{singleItem.price}</h2>
            <hr />
            <p>{singleItem.description}</p>
            <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
            <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
        </div>
    )
}

export default ReadSingleItem
