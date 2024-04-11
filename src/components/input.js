// src/components/input.js
"use client"

import { useState } from "react"

export default function Input({label, type, name, placeholder = "", value = "", statusMessage = ""}) {
	const [valueState, setValueState] = useState(value)
	
	return (
		<label className="block my-8 relative">
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				value={valueState}
				className={`py-2 pl-2 rounded-sm w-full text-black peer ${statusMessage ? "outline outline-red-500 outline-2" : null}`}
				onChange={event => setValueState(event.target.value)}
				autoFocus={statusMessage ? true : false}
			/>
			<span className="absolute top-2 left-2 text-black peer-focus:-top-6 peer-focus:text-white peer-focus:text-sm [transition:all_500ms_ease-in-out] peer-[:not([value=''])]:-top-6 peer-[:not([value=''])]:text-white peer-[:not([value=''])]:text-sm">{label}</span>
			<span className="block text-red-500 text-xs">{statusMessage}</span>
		</label>
	)
}