import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Register.css';
import Page1Component from './Page1';
import Page2Component from './page2';
import Page3Component from './Page3';
import Page4Component from './Page4';
import { useState } from 'react';
import { Register } from './Register';


const steps = ['על המתחם החדש', 'פרטים אישיים', 'פרטים בית הספר','שאלות אחרונות'];


  

const RegisterComponent =  () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [page1Register,setPage1Register]=useState<Page2Register>({
    studentFirstName: '',
    studentLastName: '',
    studentPhone: '',
    parentPhone: '',
    studentId: '',
    studentEmail: '',
    parentEmail: '',
    studentAddress: ''
  })
  const [register,setRegister]=useState<Register >({
    id: '',
    studentFirstName: '',
    studentLastName: '',
    studentPhone: '',
    parentPhone: '',
    studentId: '',
    studentEmail: '',
    parentEmail: '',
    studentAddress: '',
    studentSchool: '',
    studyUnitsMajor: '',
    numStudyUnitsMath: '',
    hearAboutUs: '',
    otherQuestions: ''


  });

  // const handleChange = (event:any) => {
  //   const { name, value } = event.target;
  //   setRegister((prevData) => ({ ...prevData, [name]: value }));
  //   console.log(register);
  // };

  // const handleSubmit = (event:any) => {
  //   event.preventDefault();
  //   // Handle form submission logic
  //   // console.log(formData);
  // };

  const pages =[
    {
      inputs:'',
      page:<Page1Component />,
    },
    {
      inputs:'',
      page:<Page2Component setRegister={setPage1Register} />,
    },
    {
      inputs:'',
      page:<Page3Component setRegister={setRegister}/>,
    },
    {
      inputs:'',
      page:<Page4Component />,
    },
  ];

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
      
    }
    
    console.log(register);
    setRegister((prevData) => ({ ...prevData, 
      studentFirstName: page1Register.studentFirstName,
      studentLastName: page1Register.studentLastName,
      studentPhone:page1Register.studentPhone,
      parentPhone:page1Register.parentPhone,
      studentId:page1Register.studentId,
      studentEmail: page1Register.studentEmail,
      parentEmail: page1Register.parentEmail,
      studentAddress: page1Register.studentAddress
      
    }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <form className='my-form'>
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                    optional?: React.ReactNode;
                } = {};
                if (isStepSkipped(index)) {
                    stepProps.completed = false;
                }
                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                 <Typography>{pages[activeStep].page}</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    >
                    חזרה
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                   
                    <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'סיום' : 'הבא'}
                    </Button>
                </Box>
                </React.Fragment>
            )}
        </Box>
    </form>
  );


};


export default RegisterComponent;
