"use client"

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import BookmarkButton from '@/components/bookmarkbutton';
const BookmarkedMovies = ({ onBookmarkToggle }) => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    fetchBookmarkedMovies().then((movies) => {
      setBookmarkedMovies(movies);
    }).catch((error) => {
      console.error('Error fetching bookmarked movies:', error);
    });
  }, []);

  const fetchBookmarkedMovies = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/account/21189807/favorite/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${apiKey}&append_to_response=videos,images`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjFkMDNjNDg5NzYyMjg1M2YwOWQxZTBiN2E0MWM1YiIsInN1YiI6IjYzZTI0YmFiNTI4YjJlMDA3ZDVlZGRiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KHlKs9hmsElURN4IXdAcNb-Fs6UzxGJvQVPsJwuQBl0'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookmarked movies');
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Fetch Bookmarked Movies Error:', error);
      return [];
    }
  };

  const handleBookmarkToggle = (movieId) => {
    onBookmarkToggle(movieId);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Bookmarked Movies</h1>
      <div>
        {bookmarkedMovies.map((movie) => (
          <div key={movie.id} className="mb-8">
            <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
              {movie.backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex justify-center items-center">
                  <span>No image available</span>
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold mt-4">{movie.title}</h2>
            <div className="flex items-center mt-2">
              <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
              <span>{parseFloat(movie.vote_average).toFixed(1)}/10 IMDb</span>
            </div>
            <BookmarkButton onClick={() => handleBookmarkToggle(movie.id)}>Save</BookmarkButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkedMovies;
