"use client"

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlay, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DarkModeButton from '@/components/darkmodebtn';
import BookmarkButton from '@/components/bookmarkbutton';
import Link from 'next/link';

const MovieDetail = ({ params }) => {
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const apiUrl = `https://api.themoviedb.org/3/movie/${params.movieid}?api_key=${apiKey}&append_to_response=videos,images,credits`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch movie detail');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };

    if (params.movieid) {
      fetchMovieDetail();
    }

    const storedBookmark = localStorage.getItem(`bookmark_${params.movieid}`);
    setIsBookmarked(storedBookmark === 'true');
  }, [params.movieid]);

  const handlePlayTrailer = () => {
    setShowVideo(true);
  };

  const toggleBookmark = async () => {
    try {
      const newBookmarkStatus = !isBookmarked;

      console.log('New bookmark status:', newBookmarkStatus);

      localStorage.setItem(`bookmark_${params.movieid}`, newBookmarkStatus.toString());

      setIsBookmarked(newBookmarkStatus);

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
          media_id: params.movieid,
          favorite: newBookmarkStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${newBookmarkStatus ? 'add' : 'remove'} bookmark`);
      }

      console.log('Bookmark toggled successfully');
    } catch (error) {
      console.error('Bookmark Error:', error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
        {movie.images && movie.images.backdrops && movie.images.backdrops.length > 0 && (
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.images.backdrops[0].file_path}`}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {showVideo && (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?autoplay=1&controls=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        {!showVideo && (
          <div className="absolute inset-0 flex justify-center items-center">
            <button
              onClick={handlePlayTrailer}
              className="w-16 h-16 rounded-full bg-white flex justify-center items-center"
            >
              <FontAwesomeIcon icon={faPlay} className="text-black text-2xl" />
            </button>
          </div>
        )}
      </div>
      <Link href="/"><FontAwesomeIcon className='absolute top-11 h-6 left-4 text-white' icon={faArrowLeft} /></Link>
      <DarkModeButton className="absolute top-4 right-4" />
      <h1 className="text-3xl">{movie.title}</h1>
      <span>
        <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
        {parseFloat(movie.vote_average).toFixed(1)}/10 IMDb
      </span>
      <div className="absolute top-60 right-5">
        <BookmarkButton isBookmarked={isBookmarked} toggleBookmark={toggleBookmark} />
      </div>
      <h2 className='text-2xl font-bold my-2'>Description</h2>
      <p className='my-2'>{movie.overview}</p>
      
    </div>
  );
};

export default MovieDetail;
