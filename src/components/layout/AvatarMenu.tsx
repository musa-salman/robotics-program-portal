import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deepOrange } from '@mui/material/colors';
import LogoutButton from '../../authentication/components/Logout';
import './AvatarMenu.css'; // Import CSS file here
import RoleBasedAccessControl from '../../authentication/components/RoleBasedAccessControl';
import { ALLOW_AUTHED_ROLES } from '../../authentication/components/Roles';
import { auth } from '../../firebase';
import { Person } from '@mui/icons-material';

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  console.log(auth.currentUser);
  return (
    <>
      <div onClick={handleAvatarClick} className="avatar-menu-container">
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
          {auth.currentUser?.photoURL ? (
            <img src={auth.currentUser?.photoURL} referrerPolicy="no-referrer" alt="avatar" />
          ) : (
            <Person />
          )}
        </Avatar>
        {auth.currentUser?.displayName && <span className="avatar-name">{auth.currentUser?.displayName}</span>}
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
          <RoleBasedAccessControl
            allowedRoles={ALLOW_AUTHED_ROLES}
            unauthorizedUnauthenticatedComponent={
              <MenuItem onClick={handleMenuClose}>
                <Link to="/login" className="login-button">
                  התחברות
                </Link>
              </MenuItem>
            }>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/profile" className="profile-button">
                פרופיל
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <LogoutButton />
            </MenuItem>
          </RoleBasedAccessControl>
        </div>
      </Menu>
    </>
  );
};

export default AvatarMenu;
