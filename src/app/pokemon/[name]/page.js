"use client"

import { useEffect, useState } from "react";

export default function Pokemoninfo({ params }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPokemonDetails(data);
      console.log(data);

    };

    fetchData();
  }, [params.name]);

  return (
    <>
      <h1 className="text-3xl">Name: {decodeURI(params.name)}</h1>
      {pokemonDetails && (
        <>
          <img src={pokemonDetails.sprites && pokemonDetails.sprites.front_default} alt="" />
          <p>Height: {pokemonDetails.height}</p>
          <p>Weight: {pokemonDetails.weight}</p>
          <p className="text-2xl margin mx-4">Types</p>
          <ul>
            {pokemonDetails.types && pokemonDetails.types.map(element => <li>{element.type.name}</li>)}
          </ul>
          <p className="text-3xl">Abilities</p>
          <ul>
            {pokemonDetails.abilities.map((ability, index) => (
              <li key={index}>
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

// "use client"

// import { useEffect, useState } from "react"

// export default function Pokemon({ params }) {
// 	const [data, setData] = useState({})

// 	useEffect(function() {
// 		fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
// 			.then(response => response.json())
// 			.then(result => setData(result))
// 	}, [])

// 	return (
// 		<>
// 			<h1 className="text-3xl capitalize text-sky-600">{data.name}</h1>
// 			<img src={data.sprites && data.sprites.front_default} alt="" />
// 			<p>Height: {data.height}</p>
// 			<p>Weight: {data.weight}</p>
// 			{/* <p>Type: {data.types && data.types[0].type.name}</p> */}
// 			<p>Types</p>
// 			<ul>
// 				{data.types && data.types.map(element => <li>{element.type.name}</li>)}
// 			</ul>
// 			<p>Abilities</p>
// 			<ul>
// 				{data.abilities && data.abilities.map(element => <li>{element.ability.name}</li>)}
// 			</ul>
// 		</>
// 	)
// }
