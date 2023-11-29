"use client"

// alt der starter med "use": er et hook i react  

// når vi destruktruere kan vi selv navngive hvert element i arrayet f.eks

// use effect gør at vi køre noget kode før at komponentet bliver renderet 
 
import { useState } from "react"

export default function Counter() {
	const [value, setValue] = useState(0)

	function count(event) {
		setValue(value + 1)
	}

	return (
		<>
			<h1 className="text-3xl">Counter</h1>
			<button onClick={count} className="border-2 border-black rounded p-3">
				Klik her
			</button>
			<p>Du har klikket {value} gange</p>
		</>
	)
}