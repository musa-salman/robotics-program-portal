import CloseIcon from '@mui/icons-material/Close';
import './DeleteModal.css';
import { Box, Button, Divider, Modal, Typography } from '@mui/material';
import { useState } from 'react';

interface DeleteModalProps {
  onDelete: () => void;
  onCancel: () => void;
}

function DeleteModal({ onDelete, onCancel }: DeleteModalProps) {
  const [open, setOpen] = useState(true);

  const handleDelete = () => {
    console.log('Delete button clicked');
    onDelete();
  };

  return (
    <Modal open={open} onClose={onCancel}>
      <Box className="modal-box">
        <Button className="clos-btn" onClick={onCancel}>
          <CloseIcon />
        </Button>
        <Typography className="del-title" variant="h4">
          לִמְחוֹק
        </Typography>
        <Divider />
        <Typography className="del-body" variant="body1">
          {' '}
          האם אתה בטוח שברצונך למחוק ?
        </Typography>
        <div className="modal-buttons">
          <Button onClick={handleDelete}>אישור</Button>
          <Button onClick={onCancel}>ביטול</Button>
        </div>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
