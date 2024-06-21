import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import './SuccessAlerts.css';
import { Button } from '@mui/material';

function SuccessAlerts() {
  return (
    <Alert icon={false} severity="success" className="alert">
      <Button className="close">
        <CloseIcon className="close-icn" />
      </Button>
      <AlertTitle>!Success</AlertTitle>
      Your download was successful
    </Alert>
  );
}

export default SuccessAlerts;
