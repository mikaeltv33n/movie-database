"use client"

import { useEffect, useState } from "react";

export default function Pokemoninfo({ params }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPokemonDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    };

    fetchData();
  }, [params.name]); 

  return (
    <>
      <h1>Name: {decodeURI(params.name)}</h1>
      {pokemonDetails && (
        <>
          <p>Height: {pokemonDetails.height}</p>
          <p>Weight: {pokemonDetails.weight}</p>
          {/* Add more details as needed */}
        </>
      )}
    </>
  );
}
