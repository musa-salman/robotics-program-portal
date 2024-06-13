import { TextField, Grid, Container, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import IdIcon from '@mui/icons-material/Badge'; 

interface Page2ComponentProps {
    setPage2Register: React.Dispatch<React.SetStateAction<Page2Register>>;
    page2Register: Page2Register;
}

const Page2Component : React.FC<Page2ComponentProps> = ({setPage2Register,page2Register}) => {

    const handleChange = (event:any) => {
        const { name, value } = event.target;
        setPage2Register((prevData) => ({ ...prevData, [name]: value }));
        
      };
    
      const handleSubmit = (event:any) => {
        event.preventDefault();
        
      };

  return (
    <Container>

      <form onSubmit={handleSubmit} className='mt-5'>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="שם פרטי"
                    name="studentFirstName"
                    value={page2Register.studentFirstName}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="שם משפחה"
                    name="studentLastName"
                    value={page2Register.studentLastName}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="טלפון הורה"
                    name="parentPhone"
                    value={page2Register.parentPhone}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <PhoneIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="פלאפון תלמיד\ה"
                    name="studentPhone"
                    value={page2Register.studentPhone}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <PhoneIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={8}>
                <TextField
                    fullWidth
                    label="תעודת זהות תלמיד"
                    name="studentId"
                    value={page2Register.studentId}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <IdIcon />
                        </InputAdornment>
                        ),
                    }}  
                />
            </Grid>

            <Grid item xs={8}>
                <TextField
                    fullWidth
                    label="Email address של אחד ההורים"
                    name="parentEmail"
                    value={page2Register.parentEmail}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={8}>
                <TextField
                    fullWidth
                    label="Email תלמיד\ה"
                    name="studentEmail"
                    value={page2Register.studentEmail}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={8}>
                <TextField
                    fullWidth
                    label="כתובת מגורים"
                    name="studentAddress"
                    value={page2Register.studentAddress}
                    onChange={handleChange}
                    required
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <HomeIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </Grid>

            
        </Grid>
      </form>
    </Container>
  );
};

export default Page2Component;
