import { Box, Button, List, ListItemButton, ListItemText, Modal } from '@mui/material';
import './RoleSelector.css';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Role, { roleNames, selectableRoles } from '../authentication/components/Roles';

interface RoleSelectorProps {
  userId: string;
  onSelect: (roleSelected: Role) => void;
  onCancel: () => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ userId, onSelect, onCancel }) => {
  const selectHandler = (role: Role) => {
    onSelect(role);
  };

  return (
    <>
      <Modal open={true} onClose={onCancel}>
        <Box className="role-list-container">
          <List className="role-list">
            {selectableRoles.map((role) => (
              <ListItemButton key={role} className="role-list-item-button" onClick={() => selectHandler(role as Role)}>
                <ListItemText primary={roleNames[role as Role]} className="role-list-item-text" />
              </ListItemButton>
            ))}
          </List>
          <Button className="clo-btn" onClick={onCancel}>
            <CloseIcon className="close-icn" />
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default RoleSelector;
