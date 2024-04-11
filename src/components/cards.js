import React from 'react';
import FetchComponent from '@/fetchapi/db';
import SeeMorebtn from "@/components/seemorebtn"

const Cards = () => {
    const cards = [
        {
            title: 'movie 1',
            content: 'Content of movie 1',
        },
        {
            title: 'movie 2',
            content: 'Content of movie 2',
        },
        {
            title: 'movie 3',
            content: 'Content of movie 3',
        },
        {
            title: 'movie 4',
            content: 'Content of movie 4',
        },
        {
            title: 'movie 5',
            content: 'Content of movie 5',
        },
    ];

    return (
        <>
            <div className='flex justify-between pr-6 '>
                <h1 className="text-2xl pl-4 font-bold">Now Showing</h1>
                <SeeMorebtn/>
            </div>
            
                <FetchComponent cards={cards} />
        </>
    );
};

export default Cards;
