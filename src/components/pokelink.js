"use client"

import Link from "next/link"

export default function PokeLink(props) {
    return (
        <Link href={`/pokemon/${props.name}`}>
            {props.name}
        </Link>
    )
}
