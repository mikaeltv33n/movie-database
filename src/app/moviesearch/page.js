"use client"
import React, { useState } from 'react';
import SearchForm from '@/components/searchform'
import NavBar from '@/components/navbar';

const MovieSearch = () => {
    const handleSearch = (results) => {
        console.log('Search results:', results);
    };

    return (
        <div>
            <SearchForm onSearch={handleSearch} />
            <NavBar/>
        </div>
    );
};

export default MovieSearch;
