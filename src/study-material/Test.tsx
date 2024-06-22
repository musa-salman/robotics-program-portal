import { Button, Snackbar } from '@mui/material';
import { useState } from 'react';

function Test() {
  const [open, setOpen] = useState(false);
  const vertical = 'top';
  const horizontal = 'center';

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Show Snackbar</Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Are you sure that you want to Delete ?"
        key={vertical + horizontal}
        action={
          <Button color="secondary" size="small" onClick={handleClose}>
            Close
          </Button>
        }
      />
    </div>
  );
}

export default Test;
