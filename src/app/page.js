"use client"

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
      <h1>Hej verden</h1>
      <button className="block " onClick={backwardHandler}>Previous page</button>
      <button onClick={forwardHandler}>Next page</button>
      
      {pokemons.map((pokemon) => (
        <Link className="block" href={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
      ))}
    </main>
  )
}
