import React from 'react';
import { Button } from '@mui/material';
import './BannerButton.css';
import { Link } from 'react-router-dom';

interface ButtonIconProps {
  icon: React.ReactElement;
  label: string;
  type: 'primary' | 'secondary';
  path: string;
  className: string;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, label, type, path, className }) => {
  return (
    <>
      <Link to={path} className="link">
        <Button
          sx={{
            fontSize: 'large',
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
            backdropFilter: 'blur(8px)', // Blur effect
            borderRadius: '4px' // Optional: Adds rounded corners
          }}
          variant="outlined"
          className={className}
          color="primary"
          startIcon={icon}>
          {label}
        </Button>
      </Link>
    </>
  );
};

export default ButtonIcon;
