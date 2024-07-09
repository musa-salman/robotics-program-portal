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
          <div>
            <Grid container spacing={4} style={{ marginBottom: '10px', margin: '10px' }}>
              <Grid item xs={14} sm={6}>
                <Box className="box">
                  <Typography variant="h4" style={{ marginBottom: '10px', margin: '10px' }}>
                    ברוכים הבאים לאתר המגמה למכטרוניקה
                  </Typography>

                  <Typography variant="body1" style={{ marginBottom: '10px', margin: '10px' }}>
                    המגמה למכטרוניקה עברה למתחם חדש! אנחנו נרגשים להודיע על פתיחת המתחם החדש שלנו בבית הספר קשת רא"ם
                    בארמון הנציב. הושקע תקציב רב בהצטיידות המתחם ובצוות מורים ומנטורים מעולים
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </div>

          <div>
            <Grid container spacing={4} style={{ marginBottom: '10px', margin: '10px' }}>
              <Grid item xs={12} sm={6}>
                <Box className="box" p={2} border={1} borderRadius={2} boxShadow={2}>
                  <Typography variant="body1" gutterBottom style={{ alignItems: 'end' }}>
                    "הדבר היפה ביותר שאנו יכולים לחוות הוא המסתורין , הוא המקור של כל האומנות והמדע"
                  </Typography>
                  <Typography variant="subtitle1" className="name" align="left">
                    -אלברט איינשטיין -
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </div>
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
