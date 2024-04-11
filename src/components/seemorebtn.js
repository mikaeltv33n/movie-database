import React from 'react';

const SeeMorebtn = ({ darkMode }) => {
    return (
        <button 
            className={`rounded-2xl border h-7 px-3 ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-500 text-gray-700'}`}
        >
            See More
        </button>
    );
};

export default SeeMorebtn;
