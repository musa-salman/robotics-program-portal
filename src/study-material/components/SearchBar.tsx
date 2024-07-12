import React, { ChangeEvent } from 'react';
// import { FaSearch } from 'react-icons/fa';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css';
import { StudyMaterial } from '../repository/StudyMaterial';
import { backdropClasses, Container, InputAdornment, TextField } from '@mui/material';
import { start } from 'repl';

interface SearchBarProps {
  studyMaterials: StudyMaterial[];
  onSearchResults: (results: StudyMaterial[] | null) => void;
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
    const filteredResults = studyMaterials.filter(
      (material) =>
        material.title.toLowerCase().includes(text.toLowerCase()) ||
        material.description.toLowerCase().includes(text.toLowerCase())
    );
    onSearchResults(filteredResults);
  };

  return (
    <Container>
      <TextField
        placeholder="חיפוש..."
        onChange={handleChange}
        aria-label="Search"
        value={query}
        sx={{ backgroundColor: 'background.paper', borderColor: 'secondary.main' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon id="search-icon" />
            </InputAdornment>
          )
        }}
      />
    </Container>
  );
};
