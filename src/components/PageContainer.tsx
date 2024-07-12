import React, { ReactNode } from 'react';
import { Typography, Box } from '@mui/material';

interface PageContainerProps {
  title: string;
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children }) => {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          padding: 2,
          backgroundColor: 'background.paper',
          color: 'primary.contrastText'
        }}>
        {title}
      </Typography>
      <Box sx={{ padding: 2 }}>{children}</Box>
    </Box>
  );
};

export default PageContainer;
