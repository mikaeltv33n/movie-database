import React, { useState, useEffect } from 'react';
import CardSlider from '@/components/cardslider';

const FetchComponent = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&append_to_response=videos,images`;

        const response = await fetch(`${apiUrl}&page=1`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        console.log(apiUrl); 
        console.log(data.results)

        const firstPageMovies = data.results && data.results.length > 0
          ? data.results.map(movie => ({ image: movie?.backdrop_path, title: movie?.title, id: movie?.id, rating: Number(movie?.vote_average).toFixed(1)}))
          : [];

        const secondResponse = await fetch(`${apiUrl}&page=2`);
        if (!secondResponse.ok) {
          throw new Error('Network response for the second page was not ok');
        }
        const secondData = await secondResponse.json();
        const secondPageMovies = secondData.results && secondData.results.length > 0
          ? secondData.results.map(movie => ({ image: movie?.backdrop_path, title: movie?.title, id: movie?.id, rating: Number(movie?.vote_average).toFixed(1)}))
          : [];

        const movies = [...firstPageMovies, ...secondPageMovies];
            
        setMovies(movies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <CardSlider movies={movies} />
    </div>
  );
};

export default FetchComponent;
