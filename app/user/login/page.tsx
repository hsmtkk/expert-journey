"use client"

import React from "react"
import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })
            const jsonResponse = await response.json()
            console.log(jsonResponse)
            localStorage.setItem("token", jsonResponse.token)
        } catch (err) {
            alert("ログイン失敗")
            console.log(err)
        }
    }

    return (
        <div>
            <h1>ログイン</h1>
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required />
                <button>ログイン</button>
            </form>
        </div>
    )
}

export default Login
