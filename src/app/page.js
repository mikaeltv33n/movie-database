"use client"

import React, { useState } from 'react';
import Cards from "@/components/cards";
import PopularMovies from "@/components/popularlist";
import MainHeading from "@/components/main-heading";
import NavBar from "@/components/navbar";
import SearchForm from "@/components/searchform";
import { useRouter } from 'next/navigation'; 

export default function MyMovies() {
  const router = useRouter(); 
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = (query) => {
    console.log("Search initiated with query:", query); 
    const queryString = encodeURIComponent(query); 
    setSearchResults(query); 

    router.push(`/moviesearch?query=${queryString}`);
  };
  

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      <MainHeading />
      <Cards />
      <PopularMovies />
      <NavBar />
    </>
  );
}
