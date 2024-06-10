import React, { useState } from 'react';
import { Button } from '@mui/material';
import './BannerButton.css';
import { Navigate } from 'react-router-dom';

interface ButtonIconProps {
  icon: React.ReactElement;
  label: string;
  path: string;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, label, path }) => {
  // TODO: Implement navigation
  const [nav, setNav] = useState(false);

  return (
    <>
      {nav && <Navigate to={path} />}
      <Button
        className="button-icon"
        startIcon={icon}
        variant="contained"
        color="inherit"
        onClick={() => {
          setNav(true);
        }}>
        {label}
      </Button>
    </>
  );
};

export default ButtonIcon;
