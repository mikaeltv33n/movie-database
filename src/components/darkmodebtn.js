import React, { useEffect } from 'react';
import UseLocalStorage from './uselocalstorage';

const DarkModeButton = () => {
    const [darkMode, setDarkMode] = UseLocalStorage('darkModeToggle', false);
    
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    return (
        <div className="absolute top-10 right-4">
            <label htmlFor="darkModeToggle" className="flex items-center cursor-pointer">
                <div className="relative">
                    <input
                        type="checkbox"
                        id="darkModeToggle"
                        className="sr-only"
                        checked={darkMode}
                        onChange={toggleDarkMode} 
                    />

                    <div className={`block ${darkMode ? 'bg-white' : 'bg-gray-400'} w-14 h-8 rounded-full`}></div>
                    <div className={`absolute left-1 top-1 ${darkMode ? 'bg-black' : 'bg-white'} w-6 h-6 rounded-full shadow-md transition ${darkMode ? 'transform translate-x-full' : ''}`}></div>
                </div>
            </label>
        </div>
    );
};

export default DarkModeButton;
