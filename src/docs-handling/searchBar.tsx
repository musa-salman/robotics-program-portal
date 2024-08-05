import React, { ChangeEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/material';
import { DocumentInfo } from './service/DocumentInfo';

/**
 * Represents the props for the SearchBar component.
 */
interface SearchBarProps {
  documents: DocumentInfo[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * SearchBar component.
 *
 * @component
 * @example
 * ```tsx
 * <SearchBar query={query} setQuery={setQuery} />
 * ```
 */
export const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    search(searchText);
  };

  const search = (text: string) => {
    setQuery(text);
    if (text.length === 0) {
      return;
    }
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
