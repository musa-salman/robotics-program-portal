import { GridActionsCellItem, GridColDef, GridRowModel } from '@mui/x-data-grid';
import CollectionTable, { MessageFormat } from '../collection-management/CollectionTable';
import { Chip } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useUserService } from '../users/UserContext';
import { User } from '../users/User';
import Role, { roleColorsLevel, roleNames, SKIP_TO_ADMIN_ROLES } from '../authentication/components/Roles';
import { useState } from 'react';
import RoleSelector from './RoleSelector';
import { FeedbackMessage } from '../components/snackbar/SnackBar';
import RolesDialog from './RolesDialog';

const UsersManagement = () => {
  const [showAddRoleDialog, setShowAddRoleDialog] = useState(false);
  const [show, setShow] = useState(false);
  const [userToAddRole, setUserToAddRole] = useState<User | null>(null);
  const userService = useUserService();

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, row: User, role: Role) => {
    event.stopPropagation();

    return userService.deleteRoleFromUser(row.id, role);
  };

  const handleDeleteUser = (user: User) => {
    return userService.deleteUser(user.id);
  };

  const generateColumns = (
    /// show form, set initial values, save item
    rows: (User & { isNew: boolean })[] | null,
    setRows: React.Dispatch<React.SetStateAction<(User & { isNew: boolean })[] | null>>,
    _setShowItemForm: React.Dispatch<React.SetStateAction<boolean>>,
    _setInitialItem: React.Dispatch<React.SetStateAction<User | null>>,
    showMessage: (message: FeedbackMessage) => void,
    onRowDeleted: (row: GridRowModel) => void
  ): GridColDef[] => {
    return [
      { field: 'email', type: 'string', headerName: 'אימייל', flex: 1 },
      {
        field: 'roles',
        type: 'custom',
        headerName: 'תפקיד',
        flex: 1,
        sortComparator: (v1, v2) => Math.min(...v1) - Math.min(...v2),
        renderCell: ({ row }) => (
          <>
            {row.roles.map((role: Role) => (
              <Chip
                key={role}
                label={roleNames[role]}
                color={roleColorsLevel[role]}
                onDelete={
                  role === Role.Student ||
                  role === Role.Pending ||
                  role === Role.PreEnrollment ||
                  role === Role.Rejected ||
                  role === Role.deleted
                    ? undefined
                    : (event) =>
                        handleDelete(event, row, role)
                          .then(() => {
                            setRows(
                              rows!.map((r) =>
                                r.id === row.id ? { ...row, roles: row.roles.filter((r: Role) => r !== role) } : r
                              )
                            );
                            showMessage({ message: 'התפקיד הוסר בהצלחה', variant: 'success' });
                          })
                          .catch(() => showMessage({ message: 'התרחשה שגיאה בהסרת התפקיד', variant: 'error' }))
                }
              />
            ))}
            {userToAddRole !== row &&
              (SKIP_TO_ADMIN_ROLES.some((role) => row.roles.includes(role)) ? (
                <Chip
                  disabled={showAddRoleDialog}
                  label="הגדר כמנהל"
                  onClick={() => {
                    userService
                      .jumpToAdminRole(row)
                      .then(() => {
                        setRows(
                          rows!.map((r) =>
                            r.id === row.id
                              ? ({
                                  ...row,
                                  roles: [Role.Admin]
                                } as User & { isNew: boolean })
                              : r
                          )
                        );
                        showMessage({ message: 'המשתמש הוגדר כמנהל בהצלחה', variant: 'success' });
                      })
                      .catch(() => showMessage({ message: 'התרחשה שגיאה בהגדרת המשתמש כמנהל', variant: 'error' }));
                  }}
                />
              ) : (
                <Chip
                  label="+"
                  onClick={() => {
                    setShowAddRoleDialog(true);
                    setUserToAddRole(row);
                  }}
                />
              ))}
            {showAddRoleDialog && userToAddRole === row && (
              <RoleSelector
                onSelect={(role) => {
                  userService
                    .addRoleToUser(userToAddRole!.id, role)
                    .then(() => {
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
                      showMessage({ message: 'התפקיד הוסף בהצלחה', variant: 'success' });
                    })
                    .catch(() => {
                      showMessage({ message: 'התרחשה שגיאה בהוספת התפקיד', variant: 'error' });
                    });
                }}
                onCancel={() => {
                  setShowAddRoleDialog(false);
                  setUserToAddRole(null);
                }}
              />
            )}
          </>
        ),
        valueGetter: (_, row) => row.roles.map((role: Role) => roleNames[role]).join(', ')
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
                onRowDeleted(rows!.find((user) => user.id === id)!);
              }}
            />
          ];
        }
      }
    ];
  };

  const messageFormat: MessageFormat<User> = {
    deleteError: () => 'התרחשה שגיאה במחיקת המשתמש',
    deleteSuccess: () => 'המשתמש נמחק בהצלחה',
    deleteConfirmation: (item) => `האם אתה בטוח שברצונך למחוק את ${item.email}?`,
    updateError: () => 'התרחשה שגיאה בעדכון הרישום',
    updateSuccess: () => 'הרישום עודכן בהצלחה'
  };

  return (
    <>
      <RolesDialog open={show} onClose={() => setShow(false)} />
      <CollectionTable<User>
        generateColumns={generateColumns}
        getItems={() => {
          return userService
            .getUsers()
            .then((users) => users.filter((u) => !(u.roles.includes(Role.Rejected) || u.roles.includes(Role.deleted))));
        }}
        messageFormat={messageFormat}
        onDelete={handleDeleteUser}
        onHelpClick={() => setShow(true)}
      />
    </>
  );
};

export default UsersManagement;
