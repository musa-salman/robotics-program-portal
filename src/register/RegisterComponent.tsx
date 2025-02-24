import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Register.css';
import PersonalInfoStep from './PersonalInfoComponent';
import AcademicForm from './AcademicInfoComponent';
import SubmissionForm from './SubmissionComponent';
import { useState } from 'react';
import { Register } from './Register';
import { isHebrewOnly } from './InputValidator';
import IntroComponent from './IntroComponent';
import { isIdentityCard, isMobilePhone } from 'validator';
import isEmail from 'validator/lib/isEmail';
import { RegisterContext } from './service/RegisterContext';
import { AuthContext } from '../authentication/services/AuthContext';
import FeedbackSnackbar, { FeedbackMessage } from '../components/snackbar/SnackBar';

/**
 * An array of steps for the registration process.
 * Each step represents a stage in the registration flow.
 */
const steps = ['על המתחם החדש', 'פרטים אישיים', 'פרטים בית הספר', 'שאלות אחרונות'];

/**
 * RegisterComponent is a functional component that handles the registration process.
 * It displays a multi-step form and handles the logic for navigating between steps,
 * validating user input, and submitting the registration data.
 *
 * @returns The RegisterComponent JSX element.
 */
const RegisterComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const { user } = useContext(AuthContext);
  const [isForward, setIsForward] = useState(false);
  const [register, setRegister] = useState<Register>({
    id: user !== null ? user!.id : '',
    firstName: '',
    lastName: '',
    studentPhoneNumber: '',
    parentPhoneNumber: '',
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
  const [message, setMessage] = useState<FeedbackMessage | null>(null);
  const [buildNumber, setBuildNumber] = useState<number>(0);

  const registerService = useContext(RegisterContext);

  const showMessage = (message: FeedbackMessage) => {
    setMessage(message);
    setBuildNumber(buildNumber + 1);
  };

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
    if (activeStep === 1) {
      if (
        isHebrewOnly(register.firstName) &&
        isHebrewOnly(register.lastName) &&
        isMobilePhone(register.studentPhoneNumber, 'he-IL') &&
        isMobilePhone(register.parentPhoneNumber, 'he-IL') &&
        isIdentityCard(register.studentId, 'he-IL') &&
        isEmail(register.studentEmail) &&
        isEmail(register.parentEmail) &&
        register.studentAddress !== ''
      ) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        setIsForward(false);
      } else {
        setIsForward(true);
      }
    }
    if (activeStep === 2) {
      if (register.studentSchool !== '' && register.studyUnitsMajor !== '' && register.numStudyUnitsMath !== '') {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        setIsForward(false);
      } else {
        setIsForward(true);
      }
    }

    if (activeStep === steps.length - 1 && user !== null) {
      registerService
        .registerStudent(register)
        .then(() => {
          showMessage({ message: 'הרשמתך בוצעה בהצלחה', variant: 'success' });
          window.location.href = '/approvalPage';
        })
        .catch(() => {
          showMessage({ message: 'שגיאה בהרשמה', variant: 'error' });
        });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('id=', register.id);
  };

  const pages = [
    {
      page: <IntroComponent />
    },
    {
      page: <PersonalInfoStep setRegister={setRegister} register={register} isForward={isForward} />
    },
    {
      page: <AcademicForm setRegister={setRegister} register={register} isForward={isForward} />
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
    <>
      {message && <FeedbackSnackbar key={buildNumber} feedBackMessage={message} />}
      <form className="my-form">
        <Box sx={{ width: '75%', backgroundColor: 'background.paper', alignItems: 'center', margin: 'auto', p: 3 }}>
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
                  {activeStep < steps.length - 1 ? 'הבא' : 'סיום'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </form>
    </>
  );
};

export default RegisterComponent;
