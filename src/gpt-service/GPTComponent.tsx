import React, { useContext, useState } from 'react';
import { Menu, MenuItem, IconButton, Tooltip, Button, Box, Typography } from '@mui/material';
import {
  Edit as EditIcon,
  TextFields as TextFieldsIcon,
  TrendingFlat as TrendingFlatIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  AutoAwesome
} from '@mui/icons-material';
import { GPTServiceContext } from './GPTContext';
import './GPT.css';

interface GPTOptions {
  simplify?: boolean;
  improve?: boolean;
  shorten?: boolean;
}

interface GPTProps {
  initialValue: string;
  getData?: () => string;
  children: React.ReactNode;
  options?: GPTOptions;
}

const SuggestedText: React.FC<{
  suggestedValue: string;
  onAccept: () => void;
  onDiscard: () => void;
}> = ({ suggestedValue, onAccept, onDiscard }) => (
  <Box
    mt={2}
    p={2}
    border={1}
    borderColor="grey.300"
    borderRadius={1}
    bgcolor="grey.100"
    boxShadow={1}
    position="relative"
    zIndex={1}
    className="suggested-text">
    <Typography variant="body1" color="textSecondary">
      {suggestedValue}
    </Typography>
    <Box mt={1} display="flex" justifyContent="flex-end">
      <Button onClick={onDiscard} color="secondary" variant="outlined" startIcon={<CloseIcon />} sx={{ mr: 1 }}>
        בטל
      </Button>
      <Button onClick={onAccept} color="primary" variant="contained" startIcon={<CheckIcon />}>
        אשר
      </Button>
    </Box>
  </Box>
);

const LoadingComponent: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
    <AutoAwesome sx={{ fontSize: 40, animation: 'rotate 2s linear infinite' }} className="ai-icon-loading" />
    <style>
      {`
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}
    </style>
  </Box>
);

const GPT: React.FC<GPTProps> = ({
  initialValue,
  getData,
  children,
  options = { simplify: true, improve: true, shorten: true }
}) => {
  const [textValue, setTextValue] = useState(initialValue);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [suggestedValue, setSuggestedValue] = useState('');
  const [loading, setLoading] = useState(false);
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
    setSuggestedValue('');
    handleMenuClose();
  };

  const handleSaveChanges = () => {
    setTextValue(suggestedValue);
    const name = (children! as any).props.name;
    (children! as any).props.onChange({ target: { value: suggestedValue, name } });
    setSuggestedValue('');
    handleMenuClose();
  };

  const handleImproveText = () => {
    setAnchorEl(null);
    setLoading(true);
    gptService.improveText(textValue).then((improvedText) => {
      setSuggestedValue(improvedText);
      setLoading(false);
    });
  };

  const handleSimplifyText = () => {
    setAnchorEl(null);
    setLoading(true);
    gptService.simplify(textValue).then((simplifiedText) => {
      setSuggestedValue(simplifiedText);
      setLoading(false);
    });
  };

  const handleShortenText = () => {
    setAnchorEl(null);
    setLoading(true);
    gptService.makeItShorter(textValue).then((shortenedText) => {
      setSuggestedValue(shortenedText);
      setLoading(false);
    });
  };

  const handleGenerateText = () => {
    setAnchorEl(null);
    if (getData) {
      const data = getData();
      setLoading(true);
      gptService.generateText(data).then((generatedText) => {
        setSuggestedValue(generatedText[0] || '');
        setLoading(false);
      });
    }
  };

  return (
    <>
      <Tooltip title="פעולות על הטקסט" arrow>
        <IconButton onClick={handleMenuOpen} size="large">
          <AutoAwesome className="ai-icon" />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {options.simplify && (
          <MenuItem onClick={handleSimplifyText}>
            <TextFieldsIcon className="ai-icon" />
            <span>פשט</span>
          </MenuItem>
        )}
        {options.improve && (
          <MenuItem onClick={handleImproveText}>
            <EditIcon className="ai-icon" />
            <span>שפר</span>
          </MenuItem>
        )}
        {options.shorten && (
          <MenuItem onClick={handleShortenText}>
            <TrendingFlatIcon className="ai-icon" />
            <span>קצר</span>
          </MenuItem>
        )}
        {getData && (
          <MenuItem onClick={handleGenerateText}>
            <AutoAwesome className="ai-icon" />
            <span>צור</span>
          </MenuItem>
        )}
      </Menu>
      {React.cloneElement(children as React.ReactElement<any>, {
        value: textValue,
        onChange: handleTextChange,
        variant: 'outlined',
        autoFocus: true,
        margin: 'normal'
      })}
      {loading ? (
        <LoadingComponent />
      ) : (
        suggestedValue && (
          <SuggestedText
            suggestedValue={suggestedValue}
            onAccept={handleSaveChanges}
            onDiscard={handleDiscardChanges}
          />
        )
      )}
    </>
  );
};

export default GPT;
