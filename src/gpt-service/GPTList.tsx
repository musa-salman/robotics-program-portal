import React, { useContext, useState, useEffect } from 'react';
import { Menu, MenuItem, IconButton, Tooltip, CircularProgress } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import { GPTServiceContext } from './GPTContext';

interface GPTProps {
  initialValue: string;
  getData?: () => string;
  children: React.ReactNode;
}

const GPTSelector: React.FC<GPTProps> = ({ initialValue, getData, children }) => {
  const [textValue, setTextValue] = useState(initialValue);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  // const [loading, setLoading] = useState(false);
  const gptService = useContext(GPTServiceContext);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setTextValue(event.target.value);
    (children! as any).props.onChange(event);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestedText: string) => {
    setTextValue(suggestedText);
    setSuggestions([]);
    handleMenuClose();
  };

  const handleGenerateSuggestions = async () => {
    if (getData) {
      const data = getData();
      // setLoading(true);
      const s = await gptService.generateText(data);
      console.log(s);
      setSuggestions(s);
    }
  };

  return (
    <>
      <Tooltip title="אפשרויות">
        <IconButton onClick={handleMenuOpen} size="large">
          <AutoAwesome />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {suggestions.length > 0
          ? suggestions.map((suggestion, index) => (
              <MenuItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
                <AutoAwesome sx={{ marginRight: 1 }} />
                <span>{suggestion}</span>
              </MenuItem>
            ))
          : getData && (
              <MenuItem onClick={handleGenerateSuggestions}>
                <AutoAwesome sx={{ marginRight: 1 }} /> צור
                {/* {loading && <CircularProgress size={24} />} */}
              </MenuItem>
            )}
      </Menu>
      {React.cloneElement(children as React.ReactElement<any>, {
        value: textValue,
        onChange: handleTextChange,
        fullWidth: true,
        multiline: true,
        rows: 5,
        variant: 'outlined',
        autoFocus: true,
        margin: 'normal'
      })}
    </>
  );
};

export default GPTSelector;
