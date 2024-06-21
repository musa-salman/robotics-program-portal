import { Box, Typography, Button } from '@mui/material';

function HeroSection() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="400px"
      bgcolor="primary.main"
      color="white"
      textAlign="center"
      flexDirection="column">
      <Typography variant="h3" gutterBottom>
        בניית העתיד, רובוט אחד בכל פעם
      </Typography>
      <Typography variant="h6" gutterBottom>
        הצטרפו אלינו בתמיכה בדור הבא של ממציאים ומהנדסים
      </Typography>
      <Box mt={2}>
        <Button variant="contained" color="secondary" size="large">
          תרמו עכשיו
        </Button>
        <Button variant="outlined" color="inherit" size="large" style={{ marginLeft: 10 }}>
          הצטרפו לצוות שלנו
        </Button>
        <Button variant="outlined" color="inherit" size="large" style={{ marginLeft: 10 }}>
          התנדבו
        </Button>
      </Box>
    </Box>
  );
}

export default HeroSection;
