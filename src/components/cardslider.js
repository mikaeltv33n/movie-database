import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const CardSlider = ({ movies }) => {
  const cardWidth = 200;

  return (
    <div className="overflow-x-scroll whitespace-nowrap">
      <div className="flex" style={{ width: `${(movies?.length || 0) * cardWidth}px` }}>
        {movies?.map((movie) => (
          <Link href={`/moviedetail/${movie.id}`} id={movie.id} key={movie.id}>
            <div className={`w-${cardWidth} flex-shrink-0`} style={{ marginRight: '-1rem' }}>
              <div className="drop-shadow-lg p-4 flex flex-col flex-wrap w-48">
                {movie.image && (
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.image}`}
                    alt={`Image ${movie.id}`}
                    className="w-48 h-60 rounded-lg mb-2 object-cover"
                  />
                )}
                <div className="whitespace-normal">
                  <div className="text-lg font-bold">{movie.title}</div>
                </div>
                <span>
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500"/> 
                  {movie.rating} 
                  /10 IMDb
                </span>  
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
