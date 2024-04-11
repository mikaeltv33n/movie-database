"use client"

import Cards from "@/components/cards"
import PopularMovies from "@/components/popularlist"
import MainHeading from "@/components/main-heading"
import NavBar from "@/components/navbar"

export default function MyMovies() {
  return (
    <>
      <MainHeading />
      <Cards />
      <PopularMovies />
      <NavBar />
    </>
  )
}
