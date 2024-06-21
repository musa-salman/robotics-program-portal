import SchoolIcon from '@mui/icons-material/School';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import './Page1.css';
import { Box, Container, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';

const IntroComponent = () => {
  return (
    <>
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            המגמה למכטרוניקה עברה למתחם חדש!
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          אנחנו נרגשים להודיע על פתיחת המתחם החדש שלנו בבית הספר קשת רא"ם בארמון הנציב. הושקע תקציב רב בהצטיידות המתחם
          ובצוות מורים ומנטורים מעולים.
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <SportsEsportsIcon />
            </ListItemIcon>
            <ListItemText primary="המגמה משתתפת בתחרות בינלאומית FRC כחלק מארגון FIRST" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary='שנה הקרובה אנחנו מתכננים להפעיל את המגמה במספר רמות על מנת לאפשר בחירה לתלמידים: 5-8-10 יח"ל' />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="בין יום ליומיים לימודים אחר הצהריים בשבוע ובנוסף ימי תחרות מרוכזים בהתאם למסלול בו התלמידים בחרו." />
          </ListItem>
        </List>

        <Box mt={4}>
          <Typography variant="body1" paragraph>
            מוזמנים לפנות:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary={<Link href="mailto:erez833@gmail.com">erez833@gmail.com</Link>} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary="050-2786860" />
            </ListItem>
          </List>
        </Box>
      </Container>
    </>
  );
};

export default IntroComponent;
