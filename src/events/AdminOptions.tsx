import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './AdminOptions.css';

interface AdminMenuProps {
  handleEdit: () => void;
  handleDelete: () => void;
}

const AdminMenu: React.FC<AdminMenuProps> = ({ handleEdit, handleDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div onClick={handleAvatarClick} className="adminOptions">
        <MoreVertIcon />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        <div className="avatar-menu">
          <div className="edit-button">
            <MenuItem onClick={handleEdit}>לַעֲרוֹך</MenuItem>
          </div>
          <div className="delete-button">
            <MenuItem onClick={handleDelete}>לִמְחוֹק</MenuItem>
          </div>
          <div className="details-button">
            <MenuItem >פרטים</MenuItem>
          </div>
        </div>
      </Menu>
    </>
  );
};

export default AdminMenu;
