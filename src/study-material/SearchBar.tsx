import React, { useState, ChangeEvent } from 'react';
import { FaSearch } from "react-icons/fa"; 
import "./SearchBar.css";
import { StudyMaterial } from './StudyMaterial';


export const SearchBar: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const [results, setResults] = useState<string[]>([]); 
   // const { studyMaterials } = useStudyMaterialContext();
   
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value;
        setInput(searchText);
        search(searchText);
    };

    // const search = (text: string) => {
    //     if (text.length > 0) {
    //         const filteredResults = studyMaterials.filter((s:StudyMaterial) => 
    //             s.title.toLowerCase().includes(text.toLowerCase()) ||
    //             s.description.toLowerCase().includes(text.toLowerCase())
    //         ).map((s:StudyMaterial) => s.title);
    //         setResults(filteredResults);
    //     } else {
    //         setResults([]);
    //     }
    // };

    return (
        <div className="Container">
            <FaSearch id="search-icon" />
            <input 
                placeholder='  חיפוש'                      
                onChange={handleChange}
                value={input}
                aria-label="Search"
            />
            <ul className="search-results">
                {results.map((result, index) => (
                    <li key={index}>{result}</li> 
                ))}
            </ul>
        </div>
    );
};
