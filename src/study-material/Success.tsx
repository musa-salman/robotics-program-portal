import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import './SuccessAlerts.css';
import { Button } from '@mui/material';
import { useState } from 'react';

interface SimpleAlertProp {
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  title: string;
}

const Alerts: React.FC<SimpleAlertProp> = ({ message, severity, title }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Alert severity={severity} className="alert">
      <Button className="close" onClick={handleClose}>
        <CloseIcon className="close-icn" />
      </Button>
      <AlertTitle>{title}</AlertTitle>
      <div>
        {message}
        <Button>Delete</Button>
      </div>
    </Alert>
  );
};

export default Alerts;
