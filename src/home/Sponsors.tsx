import { Box, Typography, Grid, Card, CardMedia } from '@mui/material';

function Sponsors() {
  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom>
        התורמים והשותפים שלנו
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card>
            <CardMedia
              component="img"
              height="100"
              src="https://picokids.org/wp-content/uploads/2022/03/bitmap.png"
              alt="Sponsor 1"
            />
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardMedia
              component="img"
              height="100"
              src="https://picokids.org/wp-content/uploads/2022/03/bitmap-1.png"
              alt="Sponsor 2"
            />
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardMedia
              component="img"
              height="100"
              src="https://picokids.org/wp-content/uploads/2022/03/bitmap-2.png"
              alt="Sponsor 3"
            />
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardMedia
              component="img"
              height="100"
              src="https://picokids.org/wp-content/uploads/2022/03/Screen-Shot-2022-03-20-at-11.38.28.png"
              alt="Sponsor 4"
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Sponsors;
