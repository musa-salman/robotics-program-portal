import { Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const teamMembers = [
  { name: "אליס ג'ונסון", role: 'קפטן הקבוצה' },
  { name: "בוב סמית'", role: 'מתכנת' },
  { name: "צ'ארלי דיוויס", role: 'מעצב' }
];

function Team() {
  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom>
        פגשו את הצוות שלנו
      </Typography>
      <Grid container spacing={2}>
        {teamMembers.map((member, index) => (
          <Grid item xs={4} key={index}>
            <Paper elevation={3} style={{ padding: 16, textAlign: 'center' }}>
              <IconButton aria-label={member.name}>
                <AccountCircleIcon style={{ fontSize: 60, color: '#3f51b5' }} />
              </IconButton>
              <Typography variant="h6" gutterBottom>
                {member.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {member.role}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Team;
