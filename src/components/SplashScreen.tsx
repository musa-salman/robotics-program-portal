import { Box, Button, Grid, Link, Toolbar, Typography } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import './SplashScreen.css';
function SplashScreen() {
  // const navItems = ['Home', 'About', 'Contact'];
  return (
    <Box className="out-box">
      <Box className="in-box">
        <div className="nav">
          <Toolbar>
            <Button color="inherit" style={{ border: 'solid', marginLeft: '15px' }}>
              התחברות
            </Button>
            <Button color="inherit">הירשם</Button>
          </Toolbar>
        </div>
        <div>{/* <Typography variant="h5" sx={{ mt: 2 }}>nnnnnn</Typography> */}</div>
        <div className="imge">
          <img src="rr.png" style={{ width: '15rem' }} />
        </div>
        <div className="contant">
          <Typography variant="h6" style={{ marginBottom: '10px' }}>
            Albert Einstein Quote
          </Typography>

          <Typography variant="body1" style={{ alignItems: 'end' }}>
            "הדבר היפה ביותר שאנו יכולים לחוות הוא המסתורין , הוא המקור של כל האומנות והמדע"- אלברט איינשטיין
          </Typography>
        </div>
        <Grid container justifyContent="left" className="foo">
          <Grid item>
            <Link href="https://www.facebook.com/teamstreak7067/" target="_blank" rel="noopener noreferrer">
              <FacebookOutlinedIcon className="socialIcon" />
            </Link>
            <Link href="https://www.instagram.com/teamstreak7067/" target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="socialIcon" />
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SplashScreen;
