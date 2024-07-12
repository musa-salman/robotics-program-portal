import React from 'react';
import { Button } from '@mui/material';
import './BannerButton.css';

interface ButtonIconProps {
  icon: React.ReactElement;
  label: string;
  type: 'primary' | 'secondary';
  path: string;
  className: string;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, label, type, path, className }) => {
  const goToPath = () => {
    window.location.href = path;
  };

  return (
    <>
      <Button className={className} startIcon={icon} variant="outlined" color={type} onClick={goToPath}>
        {label}
      </Button>
    </>
  );
};

export default ButtonIcon;
