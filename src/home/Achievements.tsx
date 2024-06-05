import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SchoolIcon from '@mui/icons-material/School';

function Achievements() {
  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom>
        הישגינו
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <PeopleIcon sx={{ fontSize: 70, color: '#3f51b5' }} />
              <Typography variant="h6">תלמידים</Typography>
              <Typography variant="h6">4,000+</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <SportsEsportsIcon sx={{ fontSize: 70, color: '#f50057' }} />
              <Typography variant="h6">תחרויות</Typography>
              <Typography variant="h6">24+</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <SchoolIcon sx={{ fontSize: 70, color: '#009688' }} />
              <Typography variant="h6">בתי ספר</Typography>
              <Typography variant="h6">60+</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Achievements;
