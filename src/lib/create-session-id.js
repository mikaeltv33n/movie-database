import Axios from "axios"

export default async function createSessionId(request_token) {
	try {
		const response = await Axios.post("https://api.themoviedb.org/3/authentication/session/new", {
				request_token: request_token
			}, {	
			headers: {
					Authorization: "Bearer " + process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN
				}
			})
		
		return response.data.session_id
	} catch (error) {
		console.error(error)
		return null
	}
}
