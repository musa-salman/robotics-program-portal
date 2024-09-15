import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { roles as permissionRoles } from '../authentication/components/Roles';

interface RolesDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Represents a dialog component for managing roles and permissions.
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Determines whether the dialog is open or not.
 * @param {Function} props.onClose - The function to be called when the dialog is closed.
 * @returns {JSX.Element} The rendered RolesDialog component.
 */
const RolesDialog: React.FC<RolesDialogProps> = ({ open, onClose }) => {
  return (
    <>
      <Dialog open={open} onClose={() => onClose()} maxWidth="lg">
        <DialogTitle>תפקידים והרשאות</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            {permissionRoles.map((role) => (
              <Box key={role.name} m={2}>
                <h3>{role.name}</h3>
                <List dense>
                  {role.permissions.map((permission, i) => (
                    <ListItem key={i}>
                      <ListItemIcon>
                        <CheckCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={permission} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()} color="primary">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RolesDialog;
