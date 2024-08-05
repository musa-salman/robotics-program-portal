import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
interface AdminMenuProps {
  handleEdit: () => void;
  handleDelete: () => void;
}

/**
 * AdminMenu component.
 *
 * @component
 * @param {AdminMenuProps} props - The props for the AdminMenu component.
 * @param {Function} props.handleEdit - The function to handle the edit action.
 * @param {Function} props.handleDelete - The function to handle the delete action.
 * @returns {JSX.Element} The rendered AdminMenu component.
 */
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
        </div>
      </Menu>
    </>
  );
};

export default AdminMenu;
