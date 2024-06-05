import { Box, Typography, Button, Grid } from '@mui/material';

function GetInvolved() {
  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom>
        השתתפו
      </Typography>
      <Typography variant="body1" gutterBottom>
        ישנן דרכים רבות לתמוך בפיקו קידס. בין אם אתם תלמידים, הורים, מקצוענים או חברי קהילה, המעורבות שלכם יכולה להוביל
        לשינוי.
      </Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" size="large">
            הצטרפו לצוות
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" size="large">
            מנחה
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" size="large">
            התנדבו
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="primary" size="large">
            תרמו
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GetInvolved;
