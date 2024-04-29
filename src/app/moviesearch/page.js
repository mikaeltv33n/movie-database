"use client"

import React, { useState } from 'react';
import SearchForm from '@/components/searchform';
import NavBar from '@/components/navbar';

const MovieSearch = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (results) => {
        setSearchResults(results);
    };

    return (
        <div className="max-h-dvh overflow-hidden">
            <SearchForm onSearch={handleSearch} />

            <div className="max-w-screen-lg mx-auto px-4 py-8">
                <div className="mt-8">
                    {error && <p className="text-center text-red-500">Error: {error.message}</p>}
                    {Array.isArray(searchResults) && searchResults.length > 0 && (
                        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {searchResults.map((movie) => (
                                movie.backdrop_path && (
                                    <li key={movie.id} className="flex flex-col items-center">
                                        <img
                                            className='w-full h-auto mb-2'
                                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                            alt={movie.title}
                                        />
                                        <span className="text-center">{movie.title}</span>
                                    </li>
                                )
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <NavBar />
        </div>
    );
};

export default MovieSearch;
