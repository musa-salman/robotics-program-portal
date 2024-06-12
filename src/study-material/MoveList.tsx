import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

function MoveList(categories: string[]) {
  console.log(categories.categories);
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
}

export default MoveList;
