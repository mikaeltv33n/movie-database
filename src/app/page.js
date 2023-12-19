"use client"

// import PokelistItem from "@/components/pokelist-item"
import Pokemon from "@/components/pokemon"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [pokemons, setPokemons] = useState([])
  const [count, setCount] = useState(0)


  function forwardHandler() {
    setCount(count + 20)
  }

  function backwardHandler() {
    if (count === 0) return
    setCount(count - 20)
  }

  useEffect(function () {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${count}`)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        setPokemons(data.results)
      })
  }, [count])

  return (
    <main>
      <h1 className="text-3xl">Pokedex</h1>

      <div className="flex start gap-4">

        <button onClick={backwardHandler}>Previous page</button>
        <button onClick={forwardHandler}>Next page</button>
      </div>
      {/* <ul>
        {pokemons.map(pokemon => <PokelistItem name="pokemon.name" />)}
      </ul> */}
      {pokemons.map((pokemon) => (
        <Link className="block" href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
        ))
      }
    </main>
  )
}
