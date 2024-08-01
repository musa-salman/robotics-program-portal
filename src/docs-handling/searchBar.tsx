import React, { ChangeEvent } from 'react';
// import { FaSearch } from 'react-icons/fa';
import SearchIcon from '@mui/icons-material/Search';
// import './SearchBar.css';
import { backdropClasses, Container, IconButton, Input, InputAdornment, TextField } from '@mui/material';
import { start } from 'repl';
import { DocumentInfo } from './service/DocumentInfo';

interface SearchBarProps {
  documents: DocumentInfo[];
  onSearchResults: (results: DocumentInfo[] | null) => void;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ documents, onSearchResults, query, setQuery }) => {
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
  const filteredResults = documents.filter(
    (documentInfo) =>
        documentInfo.name.toLowerCase().includes(text.toLowerCase()) ||
        documentInfo.description.toLowerCase().includes(text.toLowerCase())
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