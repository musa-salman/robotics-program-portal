import { Box, Button, List, ListItemButton, ListItemText, Modal } from '@mui/material';
import './MoveList.css';
import { useState } from 'react';
import { Category } from '../upload-file/Category';
import CloseIcon from '@mui/icons-material/Close';

interface MoveListProps {
  categories: Category[];
  onMove: (categorySelected: Category) => void;
  onCancel: () => void;
}

const MoveList: React.FC<MoveListProps> = ({ categories, onMove, onCancel }) => {
  // const [selectedCategory, setSelectedCategory] = useState<Category[] | null>(null);
  const [open, setOpen] = useState(true);

  const moveHandler = (category: Category) => {
    // setSelectedCategory(category);
    onMove(category);
  };

  return (
    <>
      <Modal open={open} onClose={onCancel}>
        <Box className="move-list-container">
          <List className="move-list">
            {categories.map((category, index) => (
              <ListItemButton key={index} className="move-list-item-button" onClick={() => moveHandler(category)}>
                <ListItemText primary={category.category} className="move-list-item-text" />
              </ListItemButton>
            ))}
          </List>
          <Button className="clo-btn" onClick={onCancel}>
            <CloseIcon className="close-icn" />
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default MoveList;
