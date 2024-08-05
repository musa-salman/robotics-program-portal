import React, { useState, useContext } from 'react';
import { GPTServiceContext } from './GPTContext';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  TextField,
  Button,
  CircularProgress,
  Snackbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SimplifyIcon from '@mui/icons-material/TextFields';
import ShortenIcon from '@mui/icons-material/ShortText';
import ImproveIcon from '@mui/icons-material/Upgrade';
import CloseIcon from '@mui/icons-material/Close';

/**
 * GPTPlayGround component.
 *
 * This component represents a playground for interacting with the GPT service.
 * It allows the developer to enter text and perform actions such as simplifying, shortening, and improving the text using the GPT service.
 * The component displays a menu with options for each action, and a result section to display the output of the selected action.
 * It also includes a snackbar to show error messages.
 *
 * @returns The GPTPlayGround component.
 */
const GPTPlayGround: React.FC = () => {
  const gptService = useContext(GPTServiceContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = async (action: 'simplify' | 'shorten' | 'improve') => {
    if (!inputText) {
      setSnackbarMessage('Please enter some text');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setResult('');
    if (action === 'simplify') {
      gptService.simplify(inputText).then((simplifiedText) => {
        setResult(simplifiedText);
        setLoading(false);
      });
    } else if (action === 'shorten') {
      gptService.makeItShorter(inputText).then((shortenedText) => {
        setResult(shortenedText);
        setLoading(false);
      });
    } else if (action === 'improve') {
      gptService.improveText(inputText).then((improvedText) => {
        setResult(improvedText);
        setLoading(false);
      });
    }

    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            GPT Service
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleAction('simplify')}>
          <SimplifyIcon />
          <Typography variant="inherit" sx={{ ml: 1 }}>
            Simplify
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleAction('shorten')}>
          <ShortenIcon />
          <Typography variant="inherit" sx={{ ml: 1 }}>
            Shorten
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleAction('improve')}>
          <ImproveIcon />
          <Typography variant="inherit" sx={{ ml: 1 }}>
            Improve
          </Typography>
        </MenuItem>
      </Menu>
      <Box sx={{ p: 3 }}>
        <TextField
          label="Input Text"
          multiline
          fullWidth
          rows={4}
          variant="outlined"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={() => handleAction('simplify')} disabled={loading}>
          Simplify
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAction('shorten')}
          disabled={loading}
          sx={{ ml: 2 }}>
          Shorten
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAction('improve')}
          disabled={loading}
          sx={{ ml: 2 }}>
          Improve
        </Button>
        {loading && <CircularProgress sx={{ ml: 2 }} />}
        {result && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Result:</Typography>
            <Typography>{result}</Typography>
          </Box>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default GPTPlayGround;
