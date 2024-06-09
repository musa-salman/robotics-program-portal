import { Box, Typography } from '@mui/material';
import { SearchOff } from '@mui/icons-material';

const NoResultsStudentSearch = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      textAlign="center">
      <SearchOff style={{ fontSize: 80 }} color="disabled" />
      <Typography variant="h6" gutterBottom>
        לא נמצאו תוצאות
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        לא נמצאו תלמידים התואמים את החיפוש
      </Typography>
    </Box>
  );
};

export default NoResultsStudentSearch;
