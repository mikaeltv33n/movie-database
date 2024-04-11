import React from 'react';
import SeeMorebtn from './seemorebtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const MovieList = ({ movies }) => {
    return (
        <section className="container mx-auto">
            <div className='flex justify-between pr-6 items-baseline' >
                <h1 className="text-3xl font-bold p-4 mb-4">Popular</h1>
                <SeeMorebtn />
            </div>

            <div>
                {movies.map((movie, index) => (
                    <div key={index} className="rounded p-4 flex items-start">
                        {movie.image && (
                            <img
                                src={`https://image.tmdb.org/t/p/original/${movie.image}`}
                                alt={`Image ${movie.id}`}
                                className="w-32 h-48 rounded-lg mb-2 object-cover mr-4"
                            />
                        )}
                        <div>
                            <div className="text-lg font-bold mb-2">{movie.title}</div>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
                                <span>{movie.rating}/10 IMDb</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MovieList;
