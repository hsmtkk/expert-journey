"use client"

import React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"

const DeleteItem = (context) => {
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
            const response = await fetch(`/api/item/delete/${context.params.id}`, {
                method: "DELETE",
                headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": token },
                body: JSON.stringify({ email }),
            })
            const jsonResponse = await response.json()
            console.log(jsonResponse)
        } catch (err) {
            alert("アイテム削除失敗")
            console.log(err)
        }
    }

    return (
        <div>
            <h1>アイテム削除</h1>
            <form onSubmit={handleSubmit}>
                <h2>{title}</h2>
                <Image src={image} width={750} height={500} alt={title} />
                <h3>{price}</h3>
                <p>{description}</p>
                <button>削除</button>
            </form>
        </div>
    )
}

export default DeleteItem
