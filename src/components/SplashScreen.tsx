import { Box, Button, Grid, Link, Toolbar, Typography } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import './SplashScreen.css';
import LoginButton from '../authentication/components/Login/Login';
function SplashScreen() {
  // const navItems = ['Home', 'About', 'Contact'];
  return (
    <Box className="out-box">
      <Box className="in-box">
        <div className="nav">
          <Toolbar>
            <LoginButton />
          </Toolbar>
        </div>
        <div>
          <Typography variant="h5" sx={{ mt: 2 }}></Typography>
        </div>
        <div className="imge">
          <img src="rr.png" alt="Alternate Text" title="Alternate Text" className="image-style" />
        </div>

        <Grid container justifyContent="left" className="foo">
          <Grid item>
            <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FacebookOutlinedIcon className="socialIcon" />
            </Link>
            <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="socialIcon" />
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SplashScreen;
