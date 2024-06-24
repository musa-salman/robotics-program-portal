import { Button, Snackbar } from '@mui/material';
import { useState } from 'react';

function Test() {
  const [open, setOpen] = useState(true);
  const vertical = 'top';
  const horizontal = 'center';

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {};

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="אתה בטוח שברצונך למחוק ?"
        key={vertical + horizontal}
        action={
          <>
            <Button color="secondary" size="small" onClick={handleDelete}>
              מחק
            </Button>

            <Button color="secondary" size="small" onClick={handleClose}>
              סגור
            </Button>
          </>
        }
      />
    </div>
  );
}

export default Test;
