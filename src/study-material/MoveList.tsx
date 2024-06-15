import { Autocomplete, Box, List, ListItemButton, ListItemText, TextField } from '@mui/material';
import './MoveList.css';
import { useState } from 'react';

interface MoveListProps {
  categories: string[];
  onMove: (category: string) => void;
}

const MoveList: React.FC<MoveListProps> = ({ categories, onMove }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const moveHandler = (category: string) => {
    setSelectedCategory(category);
    onMove(selectedCategory);
  };

  //   return (
  //     <>
  //       <Box className ='move-list-container'>
  //         <List  className="move-list">
  //           {categories.map((category ,index) => (
  //             <ListItemButton key={index} className='move-list-item-button' onClick={() => moveHandler(category)} >
  //               <ListItemText primary={category} className='move-list-item-text'/>
  //             </ListItemButton>
  //           ))}
  //         </List>
  //       </Box>
  //     </>
  //   );
  // };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={categories}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="choose category" />}
      onChange={(event, newValue) => {
        if (newValue) {
          moveHandler(newValue as string);
        }
      }}
    />
  );
};

export default MoveList;
