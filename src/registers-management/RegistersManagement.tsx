import { GridActionsCellItem, GridColDef, GridRowModel } from '@mui/x-data-grid';
import CollectionTable, { MessageFormat } from '../collection-management/CollectionTable';
import EditIcon from '@mui/icons-material/Edit';
import { useCallback, useContext, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Register } from '../register/Register';
import { RegisterContext } from '../register/service/RegisterContext';
import StudentForm from '../students-management/StudentForm';
import { Close, Done } from '@mui/icons-material';
import StudentDetails from './RegisterDetails';

const RegisterManagement = () => {
  const [selectedRegister, setSelectedRegister] = useState<Register | null>(null);
  const registerService = useContext(RegisterContext);

  const generateColumns = (
    /// show form, set initial values, save item
    rows: (Register & { isNew: boolean })[] | null,
    setRows: React.Dispatch<React.SetStateAction<(Register & { isNew: boolean })[] | null>>,
    setShowItemForm: React.Dispatch<React.SetStateAction<boolean>>,
    setInitialItem: React.Dispatch<React.SetStateAction<Register | null>>,
    setMessage: React.Dispatch<React.SetStateAction<string | null>>
  ): GridColDef[] => {
    return [
      { field: 'studentId', type: 'string', headerName: 'תעודת זהות', flex: 1, editable: true },
      { field: 'studentAddress', type: 'string', headerName: 'כתובת', flex: 1, editable: true },
      {
        field: 'studentName',
        type: 'string',
        headerName: 'שם תלמיד',
        flex: 1,
        renderCell: ({ row }) => (
          <div>
            <Typography>
              {row.firstName} {row.lastName}
            </Typography>
          </div>
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
              icon={<EditIcon color="action" />}
              label="ערוך"
              onClick={(_) => {
                setInitialItem(rows!.find((register) => register.id === id) || null);
                setShowItemForm(true);
              }}
            />,
            <GridActionsCellItem
              icon={<Close color="error" />}
              label="לדחות"
              onClick={(_) => {
                registerService
                  .rejectRegister(id.toString())
                  .then(() => setRows(rows!.filter((register) => register.id !== id)))
                  .catch((_) => {
                    setMessage('התרחשה שגיאה בדחיית הרישום');
                  });
              }}
            />,
            <GridActionsCellItem
              icon={<Done color="success" />}
              label="לאשר"
              onClick={(_) => {
                registerService
                  .approveRegister(rows!.find((register) => register.id === id)!)
                  .then(() => setRows(rows!.filter((register) => register.id !== id)))
                  .catch((_) => {
                    setMessage('התרחשה שגיאה באישור הרישום');
                  });
              }}
            />
          ];
        }
      }
    ];
  };

  const messageFormat: MessageFormat<Register> = {
    deleteError: () => 'התרחשה שגיאה בדחיית הרישום',
    deleteSuccess: () => 'הרישום נדחה בהצלחה',
    updateError: () => 'התרחשה שגיאה בעדכון הרישום',
    updateSuccess: () => 'הרישום עודכן בהצלחה'
  };

  const handleRowSelected = useCallback((row: GridRowModel | null) => {
    setSelectedRegister(row as Register);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={selectedRegister ? 8 : 12}>
        <CollectionTable<Register>
          generateColumns={generateColumns}
          repository={registerService.registerRepository}
          FormComponent={StudentForm}
          messageFormat={messageFormat}
          onRowSelected={handleRowSelected}
        />
      </Grid>
      <Grid item xs={4}>
        {selectedRegister && (
          <StudentDetails registrationData={selectedRegister} onClose={() => setSelectedRegister(null)} />
        )}
      </Grid>
    </Grid>
  );
};

export default RegisterManagement;
