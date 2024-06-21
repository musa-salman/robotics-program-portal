import { Box, Typography } from '@mui/material';

function AboutUs() {
  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom>
        אודותינו
      </Typography>
      <Typography variant="body1" gutterBottom>
        ברוכים הבאים לפיקו קידס, ארגון ללא מטרות רווח המוקדש להשראת תלמידי תיכון דרך ההתרגשות שבעולם הרובוטיקה. הקבוצה
        שלנו מתחרה ב-[תחרויות ספציפיות, למשל, תחרות הרובוטיקה FIRST], ומטפחת כישורים בהנדסה, תכנות, עבודת צוות
        ומנהיגות..
      </Typography>
    </Box>
  );
}

export default AboutUs;
