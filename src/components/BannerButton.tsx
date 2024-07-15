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
          variant="outlined"
          color={type === 'primary' ? 'primary' : 'secondary'}
          className={className}
          startIcon={icon}>
          {label}
        </Button>
      </Link>
    </>
  );
};

export default ButtonIcon;
