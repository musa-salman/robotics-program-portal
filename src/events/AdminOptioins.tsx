import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
      <div onClick={handleAvatarClick} className="avatar-menu-container">
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
          <MenuItem onClick={handleEdit}>לַעֲרוֹך</MenuItem>
          <MenuItem onClick={handleDelete}>לִמְחוֹק</MenuItem>
        </div>
      </Menu>
    </>
  );
};

export default AdminMenu;
