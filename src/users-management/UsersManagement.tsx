import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import CollectionTable, { MessageFormat } from '../collection-management/CollectionTable';
import { Chip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useUserService } from '../users/UserContext';
import { User } from '../users/User';
import Role, { roleColors, roleNames } from '../authentication/components/Roles';
import { useState } from 'react';
import RoleSelector from './RoleSelector';

const UsersManagement = () => {
  const [showAddRoleDialog, setShowAddRoleDialog] = useState(false);
  const [userToAddRole, setUserToAddRole] = useState<User | null>(null);
  const userService = useUserService();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, row: User, role: Role) => {
    event.stopPropagation();

    if (role === Role.Student) {
    }
    return userService.deleteRoleFromUser(row.id, role);
  };

  const generateColumns = (
    /// show form, set initial values, save item
    rows: (User & { isNew: boolean })[] | null,
    setRows: React.Dispatch<React.SetStateAction<(User & { isNew: boolean })[] | null>>,
    _setShowItemForm: React.Dispatch<React.SetStateAction<boolean>>,
    _setInitialItem: React.Dispatch<React.SetStateAction<User | null>>,
    _setMessage: React.Dispatch<React.SetStateAction<string | null>>
  ): GridColDef[] => {
    return [
      { field: 'email', type: 'string', headerName: 'אימייל', flex: 1 },
      {
        field: 'roles',
        type: 'custom',
        headerName: 'תפקיד',
        flex: 1,
        renderCell: ({ row }) => (
          <>
            {row.roles.map((role: Role) => (
              <Chip
                key={role}
                label={roleNames[role]}
                style={{ backgroundColor: roleColors[role].main, color: roleColors[role].contrastText }}
                onDelete={
                  role === Role.Student
                    ? undefined
                    : (event) =>
                        handleDelete(event, row, role).then(() => {
                          setRows(
                            rows!.map((r) =>
                              r.id === row.id ? { ...row, roles: row.roles.filter((r: Role) => r !== role) } : r
                            )
                          );
                        })
                }
              />
            ))}
            <Chip
              label="+"
              style={{ backgroundColor: 'green', color: 'white', fontSize: '29px' }}
              onClick={() => {
                setShowAddRoleDialog(true);
                setUserToAddRole(row);
              }}
            />
            {showAddRoleDialog && (
              <RoleSelector
                userId={userToAddRole!.id}
                onSelect={(role) => {
                  userService.addRoleToUser(userToAddRole!.id, role).then(() => {
                    setShowAddRoleDialog(false);
                    setRows(
                      rows!.map((r) =>
                        r.id === userToAddRole!.id
                          ? ({
                              ...userToAddRole!,
                              roles: [...userToAddRole!.roles, role].filter((r, i, a) => a.indexOf(r) === i)
                            } as User & { isNew: boolean })
                          : r
                      )
                    );
                  });
                }}
                onCancel={() => setShowAddRoleDialog(false)}
              />
            )}
          </>
        )
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'פעולות',
        width: 150,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<Delete />}
              label="מחק"
              onClick={(_) => {
                userService.deleteUser(id.toString()).then(() => {
                  setRows(rows!.filter((r) => r.id !== id.toString()));
                });
              }}
            />
          ];
        }
      }
    ];
  };

  const messageFormat: MessageFormat<User> = {
    deleteError: () => 'התרחשה שגיאה בדחיית הרישום',
    deleteSuccess: () => 'הרישום נדחה בהצלחה',
    updateError: () => 'התרחשה שגיאה בעדכון הרישום',
    updateSuccess: () => 'הרישום עודכן בהצלחה'
  };

  return (
    <>
      <CollectionTable<User>
        title="ניהול משתמשים"
        generateColumns={generateColumns}
        getItems={() => userService.getUsers()}
        messageFormat={messageFormat}
      />
    </>
  );
};

export default UsersManagement;
