import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const CardSlider = ({ movies }) => {
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startOffset, setStartOffset] = useState(0);
  const [offset, setOffset] = useState(0);
  const cardWidth = 200;
  const sliderRef = useRef(null);

  const handleTouchStart = (e) => {
    setDragging(true);
    setStartX(e.touches[0].clientX);
    setStartOffset(offset);
  };

  const handleTouchMove = (e) => {
    if (!dragging) return;
    const x = e.touches[0].clientX;
    const deltaX = x - startX;
    const newOffset = Math.min(
      Math.max(startOffset + deltaX, -(movies?.length - 1) * cardWidth),
      0
    );
    setOffset(newOffset);
  };

  const handleTouchEnd = () => {
    setDragging(false);
    const currentIndex = Math.round(-offset / cardWidth);
    setOffset(-currentIndex * cardWidth);
  };

  return (
    <div
      className="relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform"
        style={{
          transform: `translateX(${offset}px)`,
          width: `${(movies?.length || 0) * cardWidth}px`,
        }}
      >
        {movies?.map((movie) => (
          <Link href={`/moviedetail/${movie.id}`} id={movie.id} key={movie.id}>
            <div
              className={`w-${cardWidth} flex-shrink-0`}
              style={{ marginRight: '-1rem' }}
            >
              <div className="drop-shadow-lg p-4 flex flex-col flex-wrap w-48">
                {movie.image && (
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.image}`}
                    alt={`Image ${movie.id}`}
                    className="w-48 h-60 rounded-lg mb-2 object-cover"
                  />
                )}
                <div className="text-lg font-bold flex flex-wrap">
                  {movie.title}
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
