"use client"

import React from "react"
import { useState } from "react"

const CreateItem = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = "dummy@example.com"
        const token = localStorage.getItem("token")
        try {
            const response = await fetch("/api/item/create", {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": token },
                body: JSON.stringify({ title, price, image, description, email }),
            })
            const jsonResponse = await response.json()
            console.log(jsonResponse)
        } catch (err) {
            alert("アイテム作成失敗")
            console.log(err)
        }
    }

    return (
        <div>
            <h1>アイテム作成</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="名前" required />
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required />
                <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" placeholder="商品説明" required />
                <button>作成</button>
            </form>
        </div>
    )
}

export default CreateItem
