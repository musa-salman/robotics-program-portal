import { FormControl, MenuItem, Select } from '@mui/material';
import './RoleSelector.css';
import Role, { roleNames, selectableRoles } from '../authentication/components/Roles';

interface RoleSelectorProps {
  onSelect: (roleSelected: Role) => void;
  onCancel: () => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect, onCancel }) => {
  const selectHandler = (role: Role) => {
    onSelect(role);
  };

  const handleChange = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    selectHandler(event.target.value as Role);
  };

  return (
    <FormControl>
      <Select
        sx={{ minWidth: 120 }}
        value=""
        autoWidth
        open
        labelId="role-selector-label"
        id="role-selector"
        label="Role"
        onChange={handleChange}
        onClose={onCancel}>
        {selectableRoles.map((role) => (
          <MenuItem key={role} value={role}>
            {roleNames[role as Role]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RoleSelector;
