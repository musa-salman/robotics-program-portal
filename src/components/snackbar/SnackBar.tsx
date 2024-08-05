import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { Alert, Slide } from '@mui/material';

/**
 * Represents a feedback message.
 *
 * @interface FeedbackMessage
 * @property {string} message - The message content.
 * @property {'success' | 'error' | 'info' | 'warning'} variant - The variant of the message.
 */
interface FeedbackMessage {
  message: string;
  variant: 'success' | 'error' | 'info' | 'warning';
}

/**
 * Props for the FeedbackSnackbar component.
 */
interface FeedbackSnackbarProps {
  feedBackMessage: FeedbackMessage;
}

/**
 * FeedbackSnackbar component displays a feedback message in a Snackbar.
 *
 * @component
 * @example
 * ```tsx
 * <FeedbackSnackbar feedBackMessage={feedback} />
 * ```
 *
 * @param {FeedbackSnackbarProps} props - The props for the FeedbackSnackbar component.
 * @param {FeedbackMessage} props.feedBackMessage - The feedback message to be displayed.
 * @returns {JSX.Element} The rendered FeedbackSnackbar component.
 */
const FeedbackSnackbar: React.FC<FeedbackSnackbarProps> = ({ feedBackMessage }) => {
  const [open, setOpen] = useState(true);

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
