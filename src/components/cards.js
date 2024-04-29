import React from 'react';
import FetchComponent from '@/fetchapi/db';
import SeeMorebtn from "@/components/seemorebtn"

const Cards = () => {
 

    return (
        <>
            <div className='flex justify-between pr-6 mt-10 '>
                <h1 className="text-2xl pl-4 font-bold">Now Showing</h1>
                <SeeMorebtn/>
            </div>
            
                <FetchComponent />
        </>
    );
};

export default Cards;
