import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';

interface SimpleSnackbarProps {
  message: string;
}

const SimpleSnackbar: React.FC<SimpleSnackbarProps> = ({ message }) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={message} action={action} />
    </>
  );
};

export default SimpleSnackbar;
