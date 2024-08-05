import React from 'react';
import './WaitingApprovalPage.css';
import { Typography } from '@mui/material';

/**
 * Component representing the page displayed to the user while waiting for approval.
 *
 * @component
 * @example
 * ```tsx
 * <WaitApprovalPage />
 * ```
 */
const WaitApprovalPage: React.FC = () => {
  return (
    <div className="wait-approval-page">
      <div className="robot-animation">🤖</div>
      <Typography variant="h2">הרישום שלך התקבל! ✅</Typography>
      <Typography variant="h5">ההרשמה שלך התקבלה. אנא המתן לאישור מהמנהל. 📝</Typography>
    </div>
  );
};

export default WaitApprovalPage;
