import { TextField, Grid, Container, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import IdIcon from '@mui/icons-material/Badge';
import { Register } from './Register';
import { isHebrewOnly } from './InputValidator';
import { isIdentityCard, isMobilePhone } from 'validator';
import isEmail from 'validator/lib/isEmail';

interface PersonalInfoProps {
  setRegister: React.Dispatch<React.SetStateAction<Register>>;
  register: Register;
}

const PersonalInfoStep: React.FC<PersonalInfoProps> = ({ setRegister, register }) => {
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setRegister((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Container>
      <form className="mt-5">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="שם פרטי"
              name="firstName"
              value={register.firstName}
              onChange={handleChange}
              required
              error={!isHebrewOnly(register.firstName)}
              helperText={!isHebrewOnly(register.firstName) ? 'יש להזין רק אותיות עבריות' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="שם משפחה"
              name="lastName"
              value={register.lastName}
              onChange={handleChange}
              required
              error={!isHebrewOnly(register.lastName)}
              helperText={!isHebrewOnly(register.lastName) ? 'יש להזין רק אותיות עבריות' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="טלפון הורה"
              name="parentPhoneNumber"
              value={register.parentPhoneNumber}
              onChange={handleChange}
              required
              error={!isMobilePhone(register.parentPhoneNumber, 'he-IL')}
              helperText={!isMobilePhone(register.parentPhoneNumber) ? 'יש להזין מספר טלפון תקין' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="פלאפון תלמיד\ה"
              name="studentPhoneNumber"
              value={register.studentPhoneNumber}
              onChange={handleChange}
              required
              error={!isMobilePhone(register.studentPhoneNumber)}
              helperText={!isMobilePhone(register.studentPhoneNumber) ? 'יש להזין מספר טלפון תקין' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              fullWidth
              label="תעודת זהות תלמיד"
              name="studentId"
              value={register.studentId}
              onChange={handleChange}
              required
              error={!isIdentityCard(register.studentId || '', 'he-IL')}
              helperText={!isIdentityCard(register.studentId || '', 'he-IL') ? 'יש להזין ת.ז תקין' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IdIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Email address של אחד ההורים"
              name="parentEmail"
              value={register.parentEmail}
              onChange={handleChange}
              required
              error={!isEmail(register.parentEmail)}
              helperText={!isEmail(register.parentEmail) ? 'יש להזין כתובת דואר אלקטרוני Gmail תקינה' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Email תלמיד\ה"
              name="studentEmail"
              value={register.studentEmail}
              onChange={handleChange}
              required
              error={!isEmail(register.studentEmail)}
              helperText={!isEmail(register.studentEmail) ? 'יש להזין כתובת דואר אלקטרוני תקינה' : ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              fullWidth
              label="כתובת מגורים"
              name="studentAddress"
              value={register.studentAddress}
              onChange={handleChange}
              required
              error={register.studentAddress === ''}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PersonalInfoStep;
