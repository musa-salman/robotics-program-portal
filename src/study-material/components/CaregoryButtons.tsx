import { Box, Tab, Tabs } from '@mui/material';
import './CaregoryButtons.css';
import React from 'react';
interface CategoryButtonsProps {
  categories: string[];
  onCategorySelect: (categorychoose: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ categories, onCategorySelect }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box className="category-box" sx={{ bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={(_, newValue) => handleChange(newValue)}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example">
          {categories.map((category, index) => (
            <Tab key={index} label={category} onClick={() => onCategorySelect(category)} sx={{ fontSize: '1.2rem' }} />
          ))}
        </Tabs>
      </Box>
    </>
  );
};

export default CategoryButtons;
