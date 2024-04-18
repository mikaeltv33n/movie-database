"use client"

import createAccountCookie from "@/actions/createaccountcookie"
import createSessionCookie from "@/actions/createsessioncookie"
import createSessionId from "@/lib/create-session-id"
import getAccount from "@/lib/get-account"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ApprovedPage() {
	const searchParams = useSearchParams()
	const router = useRouter()

	async function init(request_token) {
		const session_id = await createSessionId(request_token)
		await createSessionCookie(session_id)
		const account = await getAccount(session_id)
		await createAccountCookie(account)
		return router.push("/bookmark")
	}

	useEffect(function() {
		const request_token = searchParams.get("request_token")
		
		if (!request_token) {
			return router.push("/signin")
		}
	
		init(request_token)
	}, [])

	return null
}
