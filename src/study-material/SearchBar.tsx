import React, { ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import { StudyMaterial } from './StudyMaterial';

interface SearchBarProps {
  studyMaterials: Map<string, StudyMaterial[]>;
  onSearchResults: (results: Map<string, StudyMaterial[]> | null) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ studyMaterials, onSearchResults, query, setQuery }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    search(searchText);
  };

  const search = (text: string) => {
    setQuery(text);
    if (text.length === 0) {
      onSearchResults(null);
      return;
    }

    const filteredResults = new Map<string, StudyMaterial[]>();
    studyMaterials.forEach((materials, category) => {
      // Filter materials array based on search text
      const filteredMaterials = materials.filter(
        (material) =>
          material.title.toLowerCase().includes(text.toLowerCase()) ||
          material.description.toLowerCase().includes(text.toLowerCase())
      );

      // Add to filteredResults map if there are filtered materials
      if (filteredMaterials.length > 0) {
        filteredResults.set(category, filteredMaterials);
      }
    });

    // Pass the filteredResults map to onSearchResults
    onSearchResults(filteredResults.size > 0 ? filteredResults : null);
  };

  return (
    <div className="Container">
      <FaSearch id="search-icon" />
      <input placeholder="  חיפוש" onChange={handleChange} aria-label="Search" value={query} />
    </div>
  );
};
