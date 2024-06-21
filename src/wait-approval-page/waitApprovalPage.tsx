import React from 'react';
import './waitApprovalPage.css'; // Import the CSS file for styles

const WaitApprovalPage: React.FC = () => {
  return (
    <div className="wait-approval-page">
      <div>.</div>
      <div className="robot-animation">
        {/* Example using an emoji as a robot icon, replace with an actual icon as needed */}
        🤖
        {/* <img src= /> */}
      </div>
      <h1 className="animated-heading">אתה רשום!</h1>
      <p className="animated-text">ההרשמה שלך התקבלה. אנא המתן לאישור מהמנהל.</p>
      <p className="animated-text">תקבל הודעה לאחר אישור הרישום שלך.</p>
    </div>
  );
};

export default WaitApprovalPage;
