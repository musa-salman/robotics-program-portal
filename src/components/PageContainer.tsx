import React, { ReactNode } from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface PageContainerProps {
  title: string;
  children: ReactNode;
}

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
          backgroundColor: 'background.paper',
          // backgroundColor: 'black',
          marginBottom: '20px',
          marginTop: '2%',
          // marginLeft:'40px',
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
