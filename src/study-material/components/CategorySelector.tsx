import { Box, Button, List, ListItemButton, ListItemText, Modal } from '@mui/material';
import './CategorySelector.css';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Category } from '../repository/Category';

interface CategorySelectorProps {
  categories: Category[];
  onMove: (categorySelected: Category) => void;
  onCancel: () => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onMove, onCancel }) => {
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

export default CategorySelector;
