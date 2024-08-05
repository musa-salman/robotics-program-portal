import { FormControl, MenuItem, Select } from '@mui/material';
import './RoleSelector.css';
import Role, { roleNames, selectableRoles } from '../authentication/components/Roles';

/**
 * Props for the RoleSelector component.
 */
interface RoleSelectorProps {
  onSelect: (roleSelected: Role) => void;
  onCancel: () => void;
}

/**
 * RoleSelector component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onSelect - The callback function called when a role is selected.
 * @param {Function} props.onCancel - The callback function called when the selection is canceled.
 * @returns {JSX.Element} The RoleSelector component.
 */
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
