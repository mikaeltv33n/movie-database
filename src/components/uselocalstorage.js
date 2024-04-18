import { useState } from 'react';

export default function UseLocalStorage(key, initialValue) {

    const isLocalStorage = typeof window !== 'undefined' && window.localStorage;

    const storedValue = isLocalStorage ? localStorage.getItem(key) : null;
    
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    const [value, setValue] = useState(initial);

    const toggleValue = () => {
        const newValue = !value;
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, toggleValue];
}
