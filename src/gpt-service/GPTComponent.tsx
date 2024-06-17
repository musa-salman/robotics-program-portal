import React, { useContext, useState } from 'react';
import { Menu, MenuItem, IconButton, Tooltip } from '@mui/material';
import {
  Edit as EditIcon,
  TextFields as TextFieldsIcon,
  TrendingFlat as TrendingFlatIcon,
  AutoAwesome
} from '@mui/icons-material';
import { GPTServiceContext } from './GPTContext';

interface GPTProps {
  initialValue: string;
  getData?: () => string;
  children: React.ReactNode;
}

const GPT: React.FC<GPTProps> = ({ initialValue, getData, children }) => {
  const [textValue, setTextValue] = useState(initialValue);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [suggestedValue, setSuggestedValue] = useState('');
  const gptService = useContext(GPTServiceContext);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
    (children! as any).props.onChange(event);
    setSuggestedValue('');
  };

  const handleDiscardChanges = () => {
    setTextValue(suggestedValue);
    handleMenuClose();
  };

  const handleSaveChanges = () => {
    setTextValue(suggestedValue);
    setSuggestedValue('');
    handleMenuClose();
  };

  const handleImproveText = () => {
    gptService.improveText(textValue).then((improvedText) => {
      setSuggestedValue(improvedText);
    });
  };

  const handleSimplifyText = () => {
    gptService.simplify(textValue).then((simplifiedText) => {
      setSuggestedValue(simplifiedText);
    });
  };

  const handleShortenText = () => {
    gptService.makeItShorter(textValue).then((shortenedText) => {
      setSuggestedValue(shortenedText);
    });
  };

  const handleGenerateText = () => {
    if (getData) {
      const data = getData();
      gptService.generateWithInput(data).then((generatedText) => {
        setTextValue(generatedText);
      });
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
        <MenuItem onClick={handleImproveText}>
          <EditIcon sx={{ marginRight: 1 }} /> שפר
        </MenuItem>
        <MenuItem onClick={handleSimplifyText}>
          <TextFieldsIcon sx={{ marginRight: 1 }} /> פשט
        </MenuItem>
        <MenuItem onClick={handleShortenText}>
          <TrendingFlatIcon sx={{ marginRight: 1 }} /> קצר
        </MenuItem>
        {getData && (
          <MenuItem onClick={handleGenerateText}>
            <AutoAwesome sx={{ marginRight: 1 }} /> צור
          </MenuItem>
        )}
        <MenuItem onClick={handleDiscardChanges}>בטל שינויים</MenuItem>
        <MenuItem onClick={handleSaveChanges}>שמור שינויים</MenuItem>
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
      {suggestedValue && <div style={{ marginTop: '10px', fontStyle: 'italic' }}>הצעה: {suggestedValue}</div>}
    </>
  );
};

export default GPT;
