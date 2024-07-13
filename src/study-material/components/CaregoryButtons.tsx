import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { Category } from '../repository/Category';
import './CaregoryButtons.css';
interface CategoryButtonsProps {
  categories: Category[];
  onCategorySelect: (categorychoose: string) => void;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ categories, onCategorySelect }) => {
  return (
    <>
      <Box className="category-box">
        <Typography className="tafret" variant="h4">
          תפריט
        </Typography>
        {/* <Divider  component="div" role="presentation"  className="divider" /> */}
        {categories.map((category, index) => (
          <Button
            variant="outlined"
            color="primary"
            key={index}
            onClick={() => onCategorySelect(category.category)}
            className="category-button">
            {category.category}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default CategoryButtons;
