import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Register } from './Register';
import { RegisterContext } from './RegisterContext';
import { isHebrewOnly } from './InputValidator';
import IntroComponent from './IntroComponent';
import PersonalInfoStep from './PersonalInfoComponent';
import AcademicForm from './AcademicInfoComponent';
import SubmissionForm from './SubmissionComponent';
import './Register.css';
import { isEmail, isEmpty, isIdentityCard, isMobilePhone } from 'validator';

const steps = ['על המתחם החדש', 'פרטים אישיים', 'פרטים בית הספר', 'שאלות אחרונות'];

const RegisterComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const registerRepository = useContext(RegisterContext);

  const [register, setRegister] = useState<Register>({
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

  const handleNext = (event: any) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (activeStep === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
    if (
      activeStep === 1 &&
      isHebrewOnly(register.studentFirstName) &&
      isHebrewOnly(register.studentLastName) &&
      isMobilePhone(register.studentPhone) &&
      isMobilePhone(register.parentPhone) &&
      isIdentityCard(register.studentId) &&
      isEmail(register.studentEmail) &&
      isEmail(register.parentEmail) &&
      !isEmpty(register.studentAddress)
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
    if (
      activeStep === 2 &&
      !isEmpty(register.studentSchool) &&
      !isEmpty(register.studyUnitsMajor) &&
      !isEmpty(register.numStudyUnitsMath)
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }

    if (activeStep === steps.length - 1) {
      registerRepository.create(register);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const pages = [
    {
      page: <IntroComponent />
    },
    {
      page: <PersonalInfoStep setRegister={setRegister} register={register} />
    },
    {
      page: <AcademicForm setRegister={setRegister} register={register} />
    },
    {
      page: <SubmissionForm setRegister={setRegister} register={register} />
    }
  ];

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <form className="my-form">
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
            <Typography sx={{ mt: 2, mb: 1 }}>סימטה את הרשום בהצלחה</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>לאִתחוּל</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography>{pages[activeStep].page}</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                חזרה
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button type="submit" onClick={handleNext}>
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
