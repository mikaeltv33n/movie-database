"use client"

import PokeLink from "./pokelink"

export default function PokelistItem(props) {
    return (
        <li>
            <PokeLink name={props.name} />
        </li>
    )
}
