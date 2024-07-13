import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { Alert, Slide } from '@mui/material';

interface FeedbackMessage {
  message: string;
  variant: 'success' | 'error' | 'info' | 'warning';
}

const FeedbackSnackbar: React.FC<FeedbackMessage> = (feedBackMessage: FeedbackMessage) => {
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        open={open}
        onClose={handleClose}
        action={action}>
        <Alert onClose={handleClose} severity={feedBackMessage.variant} variant="filled" sx={{ width: '100%' }}>
          {feedBackMessage.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FeedbackSnackbar;
export type { FeedbackMessage };
