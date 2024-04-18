"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BookmarkButton from '@/components/bookmarkbutton';

const BookmarkedMovies = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarkedMovies().then((movies) => {
      setBookmarkedMovies(movies.map(movie => ({ ...movie, isBookmarked: localStorage.getItem(`bookmark_${movie.id}`) === 'true' })));
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching bookmarked movies:', error);
      setLoading(false);
    });
  }, []);

  const fetchBookmarkedMovies = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const response = await fetch(`https://api.themoviedb.org/3/account/21189807/favorite/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=${apiKey}&append_to_response=videos,images`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN
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

const handleBookmarkToggle = async (movieId) => {
    try {
      const storedBookmark = localStorage.getItem(`bookmark_${movieId}`);
      const newBookmarkStatus = storedBookmark !== 'true';
      localStorage.setItem(`bookmark_${movieId}`, newBookmarkStatus.toString());
      
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const url = `https://api.themoviedb.org/3/account/21189807/favorite?api_key=${apiKey}`;
      
      const method = 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN
        },
        body: JSON.stringify({
          media_type: 'movie',
          media_id: movieId,
          favorite: newBookmarkStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${newBookmarkStatus ? 'add' : 'remove'} bookmark`);
      }

      setBookmarkedMovies(prevMovies => prevMovies.map(movie => {
        if (movie.id === movieId) {
          return { ...movie, isBookmarked: newBookmarkStatus };
        }
        return movie;
      }));
    } catch (error) {
      console.error('Bookmark Error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Bookmarked Movies</h1>
      <Link href="/"><FontAwesomeIcon className='h-8 left-6 ml-2' icon={faArrowLeft} /></Link>
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
            <BookmarkButton isBookmarked={movie.isBookmarked} toggleBookmark={() => handleBookmarkToggle(movie.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkedMovies;
