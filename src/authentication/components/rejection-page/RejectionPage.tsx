import React from 'react';
import './RejectionPage.css';

/**
 * RejectionPage component.
 *
 * This component displays a rejection page with a robot animation and rejection message.
 *
 * @returns The rendered RejectionPage component.
 */
const RejectionPage: React.FC = () => {
  return (
    <div className="rejection-page">
      <div className="robot-animation">🤖</div>
      <h1 className="animated-heading">הרישום נדחה ❌</h1>
      <p className="animated-text">לצערנו, הרישום שלך נדחה. 📝</p>
      <p className="animated-text">אנא פנה למנהל למידע נוסף. 📞</p>
    </div>
  );
};

export default RejectionPage;
