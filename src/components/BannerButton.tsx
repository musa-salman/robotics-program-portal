import React from 'react';
import { Button } from '@mui/material';
import './BannerButton.css';
import { Link } from 'react-router-dom';

/**
 * Represents the props for the ButtonIcon component.
 */
interface ButtonIconProps {
  icon: React.ReactElement;
  label: string;
  type: 'primary' | 'secondary';
  path: string;
  className: string;
}

/**
 * ButtonIcon component.
 *
 * @component
 * @param {ButtonIconProps} props - The props for the ButtonIcon component.
 * @param {React.ReactNode} props.icon - The icon element to be displayed.
 * @param {string} props.label - The label text for the button.
 * @param {string} props.type - The color type of the button.
 * @param {string} props.path - The path for the link.
 * @param {string} props.className - The CSS class name for the button.
 * @returns {JSX.Element} The rendered ButtonIcon component.
 */
const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, label, type, path, className }) => {
  return (
    <>
      <Link to={path} className="link">
        <Button
          sx={{
            fontSize: 'large',
            borderRadius: '4px'
          }}
          variant="outlined"
          className={className}
          color={type}
          startIcon={icon}>
          {label}
        </Button>
      </Link>
    </>
  );
};

export default ButtonIcon;
