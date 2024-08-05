import React, { ChangeEvent } from 'react';
// import { FaSearch } from 'react-icons/fa';
import SearchIcon from '@mui/icons-material/Search';
// import './SearchBar.css';
import { StudyMaterial } from '../repository/StudyMaterial';
import { Input } from '@mui/material';

/**
 * Props for the SearchBar component.
 *
 * @interface SearchBarProps
 * @property {StudyMaterial[]} studyMaterials - The list of study materials.
 * @property {(results: StudyMaterial[] | null) => void} onSearchResults - Callback function to handle search results.
 * @property {string} query - The search query.
 * @property {React.Dispatch<React.SetStateAction<string>>} setQuery - Function to update the search query.
 */
interface SearchBarProps {
  studyMaterials: StudyMaterial[];
  onSearchResults: (results: StudyMaterial[] | null) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * SearchBar component for filtering study materials based on a search query.
 *
 * @component
 * @example
 * ```tsx
 * <SearchBar
 *   studyMaterials={studyMaterials}
 *   onSearchResults={handleSearchResults}
 *   query={searchQuery}
 *   setQuery={setSearchQuery}
 * />
 * ```
 *
 * @param {Object} props - The component props.
 * @param {Array<StudyMaterial>} props.studyMaterials - The array of study materials to filter.
 * @param {Function} props.onSearchResults - The callback function to handle search results.
 * @param {string} props.query - The current search query.
 * @param {Function} props.setQuery - The function to update the search query.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
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
    const filteredResults = studyMaterials.filter(
      (material) =>
        material.title.toLowerCase().includes(text.toLowerCase()) ||
        material.description.toLowerCase().includes(text.toLowerCase())
    );
    onSearchResults(filteredResults);
  };

  return (
    <div>
      <Input
        placeholder="  חיפוש..."
        onChange={handleChange}
        aria-label="Search"
        sx={{ width: '99%', margin: '20px' }}
        value={query}
        startAdornment={<SearchIcon />}
      />
    </div>
  );
};
