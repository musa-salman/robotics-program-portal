import React, { ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import { StudyMaterial } from './StudyMaterial';

interface SearchBarProps {
  studyMaterials: StudyMaterial[];
  onSearchResults: (results: StudyMaterial[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ studyMaterials, onSearchResults }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    search(searchText);
  };

  const search = (text: string) => {
    const filteredResults = studyMaterials.filter(
      (material) =>
        material.title.toLowerCase().includes(text.toLowerCase()) ||
        material.description.toLowerCase().includes(text.toLowerCase())
    );
    onSearchResults(filteredResults);
  };

  return (
    <div className="Container">
      <FaSearch id="search-icon" />
      <input placeholder="  חיפוש" onChange={handleChange} aria-label="Search" />
    </div>
  );
};
