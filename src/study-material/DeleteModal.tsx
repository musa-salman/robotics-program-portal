import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import { useState } from 'react';

/**
 * Props for the DeleteModal component.
 */
interface DeleteModalProps {
  onDelete: () => void;
  onCancel: () => void;
  message: string;
}

/**
 * Renders a delete confirmation modal.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onDelete - The function to be called when delete is confirmed.
 * @param {Function} props.onCancel - The function to be called when delete is cancelled.
 * @param {string} props.message - The message to be displayed in the modal.
 * @returns {JSX.Element} The delete confirmation modal component.
 */
function DeleteModal({ onDelete, onCancel, message }: DeleteModalProps) {
  const [open] = useState(true);

  const handleDelete = () => {
    onDelete();
  };

  return (
    <Modal open={open} onClose={onCancel}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30rem',
          boxShadow: 24,
          backgroundColor: 'background.paper',
          p: 4,
          borderRadius: 1,
          outline: 'none'
        }}>
        <Typography variant="h4" sx={{ marginLeft: '0.25rem', marginBottom: '0.5rem' }}>
          לִמְחוֹק
          <Button onClick={onCancel} sx={{ marginLeft: '15.9rem', marginBottom: '0.5rem' }}>
            <CloseIcon />
          </Button>
        </Typography>
        <Divider />
        <Typography variant="body1" sx={{ marginLeft: '0.5rem', marginBottom: '2.2rem' }}>
          <h3>{message}</h3>
          <h4>אתה לא יכול לחזור אחורה לאחר מחיקת</h4>
        </Typography>

        <Button
          variant="contained"
          style={{ marginRight: '10rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
          onClick={handleDelete}>
          אישור
        </Button>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
