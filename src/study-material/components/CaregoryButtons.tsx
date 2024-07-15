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
      <Box className="category-box">
        <Typography className="tafret" variant="h4">
          תפריט
        </Typography>
        {/* <Divider  component="div" role="presentation"  className="divider" /> */}
        {/* {categories.map((category, index) => (
          // <Button
          //   variant="outlined"
          //   color="primary"
          //   key={index}
          //   onClick={() => onCategorySelect(category)}
          //   className="category-button">
          //   {category}
          // </Button>
        ))} */}
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
