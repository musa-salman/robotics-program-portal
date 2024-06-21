import { Box, Typography, Grid } from '@mui/material';
import { Lightbulb, Group, School, Public } from '@mui/icons-material';

function OurMission() {
  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom>
        המשימה שלנו
      </Typography>
      <Typography variant="body1" gutterBottom>
        המשימה שלנו היא לספק לתלמידי תיכון פלטפורמה לחקירת STEM (מדע, טכנולוגיה, הנדסה ומתמטיקה) באמצעות ניסיון מעשי
        בתכנון, בנייה ותכנות רובוטים. אנו שואפים לטפח סקרנות, חדשנות וכישורי פתרון בעיות, שיכינו את חברי הקבוצה שלנו
        לקריירות עתידיות בטכנולוגיה והנדסה.
      </Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={3}>
          <Lightbulb fontSize="large" />
          <Typography variant="h6">חדשנות</Typography>
        </Grid>
        <Grid item xs={3}>
          <Group fontSize="large" />
          <Typography variant="h6">עבודת צוות</Typography>
        </Grid>
        <Grid item xs={3}>
          <School fontSize="large" />
          <Typography variant="h6">חינוך</Typography>
        </Grid>
        <Grid item xs={3}>
          <Public fontSize="large" />
          <Typography variant="h6">קהילה</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OurMission;
