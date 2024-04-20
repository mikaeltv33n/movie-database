import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [query, setQuery] = useState('');

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
      
          const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&query=${query}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=trending/all.desc`;
          const response = await fetch(apiUrl, options);
          if (!response.ok) {
            throw new Error('Failed to fetch search results');
          }
          const data = await response.json();
          onSearch(data.results);
        } catch (error) {
          console.error('Fetch Error:', error);
        }
      };
      
    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-1/2 mx-auto">
            <div className="flex flex-col mb-4">
                <label htmlFor="query" className="mb-1 text-2xl">Search for a movie</label>
                <input
                    type="text"
                    id="query"
                    name="query"
                    value={query}
                    onChange={handleChange}
                    className="text-black border border-gray-400 rounded-md px-3 py-1"
                />
            </div>

            <button type="submit" className="text-white px-4 py-2 uppercase font-semibold rounded-md bg-blue-500 hover:bg-blue-600">
                Search
            </button>
        </form>
    );
};

export default SearchForm;
