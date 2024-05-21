 import React, { useState, ChangeEvent } from 'react';
import { FaSearch } from "react-icons/fa"; 
import "./SearchBar.css";

export const SearchBar: React.FC = () => {
    const [input, setInput] = useState<string>("");

    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value;
        setInput(searchText);
       search(searchText);
    };

    const search = (text: string) => { 
        console.log(`Searching for: ${text}`);
    };
    return (
        <div className="Container">
            <FaSearch id="search-icon" />
            <input 
                placeholder='  חיפוש'                      
                onChange={handleChange}
                value={input}
                aria-label="Search"
            />
            {input && <p> חיפוש על : {input}</p>}
        </div>
    );
};
