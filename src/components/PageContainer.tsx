import React, { ReactNode } from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * Props for the PageContainer component.
 */
interface PageContainerProps {
  title: string;
  children: ReactNode;
}

/**
 * PageContainer component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the page.
 * @param {ReactNode} props.children - The content of the page.
 * @returns {ReactNode} The rendered PageContainer component.
 */
const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
          backgroundColor: 'black',
          marginBottom: '10px',
          marginTop: '20px',
          width: '20%',
          color: 'primary.contrastText',
          boxShadow: `0px 2px 7px 0px ${theme.palette.primary.main}`
        }}>
        {title}
      </Typography>
      <Box sx={{ padding: 2 }}>{children}</Box>
    </Box>
  );
};

export default PageContainer;
