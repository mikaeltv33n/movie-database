import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const apiKey = process.env.NEXT_PUBLIC_API_KEY;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN
                }
            };
            const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&include_adult=false&language=en-US&page=1`;
            const response = await fetch(apiUrl, options);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }

            const data = await response.json();
            setSearchResults(data.results);
            onSearch(data.results);
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };

    return (
        <div className="max-h-dvh overflow-hidden">
            <header className="flex justify-between items-center px-6 h-[10dvh]">
                <form onSubmit={handleSubmit}>
                    <div className="relative w-24">
                        <input
                            value={query}
                            onChange={handleChange}
                            type="search"
                            placeholder="Search for movies..."
                            className="border p-0.5 border-gray-300 w-full focus:w-[300px] transition-all duration-200"
                        />
                    </div>
                </form>
                <div>
                    <input type="checkbox" className="sr-only" />
                </div>
            </header>
        </div>
    );
};

export default SearchForm;
