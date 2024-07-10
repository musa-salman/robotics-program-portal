import React from 'react';
import { Button } from '@mui/material';
import './BannerButton.css';

interface ButtonIconProps {
  icon: React.ReactElement;
  label: string;
  path: string;
  className: string;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, label, path, className }) => {
  const goToPath = () => {
    window.location.href = path;
  };

  return (
    <>
      <Button className={className} startIcon={icon} variant="contained" color="inherit" onClick={goToPath}>
        {label}
      </Button>
    </>
  );
};

export default ButtonIcon;
