import MovieList from './movielist'; 
import React, { useState, useEffect } from 'react';

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&append_to_response=videos,images&page=1`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const moviesData = data.results && data.results.length > 0
          ? data.results.map(movie => ({
              image: movie?.backdrop_path,
              title: movie?.title,
              genre: movie?.genre_ids,
              rating: Number(movie?.vote_average).toFixed(1)
            }))
          : [];

        setMovies(moviesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return <MovieList movies={movies} />;
}
