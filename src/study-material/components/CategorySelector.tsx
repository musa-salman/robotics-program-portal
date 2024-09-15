import { Box, Button, List, ListItemButton, ListItemText, Modal, Typography } from '@mui/material';
import './CategorySelector.css';
import CloseIcon from '@mui/icons-material/Close';
import { Category } from '../repository/Category';
import { useTheme } from '@mui/material/styles';

/**
 * Props for the CategorySelector component.
 */
interface CategorySelectorProps {
  categories: Category[];
  onMove: (categorySelected: Category) => void;
  onCancel: () => void;
}

/**
 * Renders a category selector component.
 *
 * @component
 * @param {CategorySelectorProps} props - The component props.
 * @param {Category[]} props.categories - The list of categories to display.
 * @param {Function} props.onMove - The function to call when a category is selected.
 * @param {Function} props.onCancel - The function to call when the modal is closed.
 * @returns {JSX.Element} The rendered category selector component.
 */
const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onMove, onCancel }) => {
  const theme = useTheme();

  const moveHandler = (category: Category) => {
    onMove(category);
  };

  return (
    <>
      <Modal open={true} onClose={onCancel}>
        <Box className="move-list-container" sx={{ bgcolor: 'background.paper' }}>
          <List className="move-list">
            <Typography variant="h4" style={{ color: theme.palette.primary.main, display: 'block' }}>
              עבור לקטגוריה
            </Typography>
            <br />
            <div style={{ maxHeight: '40vh', overflowY: 'auto' }}>
              {categories.map((category, index) => (
                <ListItemButton key={index} className="move-list-item-button" onClick={() => moveHandler(category)}>
                  <ListItemText primary={category.category} className="move-list-item-text" />
                </ListItemButton>
              ))}
            </div>
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
