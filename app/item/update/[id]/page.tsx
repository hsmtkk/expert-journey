"use client"

import React from "react"
import { useState, useEffect } from "react"

const UpdateItem = (context) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        const getSingleItem = async (id: string) => {
            const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`)
            const jsonResponse = await response.json()
            const singleItem = jsonResponse.singleItem
            setTitle(singleItem.title)
            setPrice(singleItem.price)
            setImage(singleItem.image)
            setDescription(singleItem.description)
            setEmail(singleItem.email)
        }
        getSingleItem(context.params.id)
    }, [context])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = "dummy@example.com"
        const token = localStorage.getItem("token")
        try {
            const response = await fetch(`/api/item/update/${context.params.id}`, {
                method: "PUT",
                headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": token },
                body: JSON.stringify({ title, price, image, description, email }),
            })
            const jsonResponse = await response.json()
            console.log(jsonResponse)
        } catch (err) {
            alert("アイテム編集失敗")
            console.log(err)
        }
    }

    return (
        <div>
            <h1>アイテム編集</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="名前" required />
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required />
                <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" placeholder="商品説明" required />
                <button>編集</button>
            </form>
        </div>
    )
}

export default UpdateItem
