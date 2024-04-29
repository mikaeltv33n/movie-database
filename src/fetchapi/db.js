import React, { useState, useEffect } from 'react';
import CardSlider from '@/components/cardslider';

const FetchComponent = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      //  if("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js")
      
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&append_to_response=videos,images&page=1`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log(data.results)

        const movies = data.results && data.results.length > 0
          ? data.results.map(movie => ({
              image: movie?.backdrop_path,
              title: movie?.title,
              id: movie?.id,
              rating: Number(movie?.vote_average).toFixed(1)
            }))
          : [];
            
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
