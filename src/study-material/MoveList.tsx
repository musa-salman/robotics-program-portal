import { Autocomplete, Box, Button, List, ListItemButton, ListItemText, Modal, TextField } from '@mui/material';
import './MoveList.css';
import { useState } from 'react';
import { Category } from '../upload-file/Category';

interface MoveListProps {
  categories: Category[];
  onMove: (categorySelected: Category) => void;
  onCancel: () => void;
}

const MoveList: React.FC<MoveListProps> = ({ categories, onMove, onCancel }) => {
  // const [selectedCategory, setSelectedCategory] = useState<Category[] | null>(null);
  const [open, setOpen] = useState(false);

  const moveHandler = (category: Category) => {
    // setSelectedCategory(category);
    onMove(category);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box className="move-list-container">
          <List className="move-list">
            {categories.map((category, index) => (
              <ListItemButton key={index} className="move-list-item-button" onClick={() => moveHandler(category)}>
                <ListItemText primary={category.category} className="move-list-item-text" />
              </ListItemButton>
            ))}
          </List>
          <Button onClick={onCancel}>Cancel</Button>
        </Box>
      </Modal>
    </>
  );
};

// return (
//   <Autocomplete
//     disablePortal
//     id="combo-box-demo"
//     options={categories}
//     sx={{ width: 300 }}
//     renderInput={(params) => <TextField {...params} label="choose category" />}
//     onChange={(event, newValue) => {
//       if (newValue) {
//         moveHandler(newValue as string);
//       }
//     }}
//   />
//   );
// };

export default MoveList;
