import { Box, List, ListItemButton, ListItemText } from '@mui/material';

interface MoveListProps {
  categories: string[];
}

const MoveList = ({ categories }: MoveListProps) => {
  return (
    <>
      <Box sx={{ width: '50%', bgcolor: 'blue', height: '120px' }}>
        <List>
          {categories.map((category) => (
            <ListItemButton>
              <ListItemText primary={category} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </>
  );
};

export default MoveList;
