"use client"

import Axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function SigninPage() {
    const [token, setToken] = useState(null)

    async function createToken() {
        const response = await Axios.get("https://api.themoviedb.org/3/authentication/token/new", {
            headers: {
				Authorization: "Bearer " + process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN
            }
        })




        setToken(response.data.request_token)
    }

    useEffect(function () {
        createToken()
    }, [])

    return (
        <>
            <Link href={`https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/approved`}>Sign in with TMDB</Link>
        </>
    )
}
