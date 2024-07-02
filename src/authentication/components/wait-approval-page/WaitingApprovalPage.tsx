import React from 'react';
import './WaitingApprovalPage.css';

const WaitApprovalPage: React.FC = () => {
  return (
    <div className="wait-approval-page">
      <div className="robot-animation">🤖</div>
      <h1 className="animated-heading">אתה רשום! ✅</h1>
      <p className="animated-text">ההרשמה שלך התקבלה. אנא המתן לאישור מהמנהל. 📝</p>
      <p className="animated-text">תקבל הודעה לאחר אישור הרישום שלך. ✉️</p>
    </div>
  );
};

export default WaitApprovalPage;
