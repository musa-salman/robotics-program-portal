import { Box, Button, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import { Category } from '../repository/Category';
import './CaregoryButtons.css';
import React from 'react';
interface CategoryButtonsProps {
  categories: string[];
  onCategorySelect: (categorychoose: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ categories, onCategorySelect }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box className="category-box" sx={{ bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example">
          {categories.map((category, index) => (
            <Tab key={index} label={category} onClick={() => onCategorySelect(category)} className="category-tab" />
          ))}
        </Tabs>
      </Box>
    </>
  );
};

export default CategoryButtons;
