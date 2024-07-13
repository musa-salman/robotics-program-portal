import { GridActionsCellItem, GridColDef, GridRowModel } from '@mui/x-data-grid';
import CollectionTable, { MessageFormat } from '../collection-management/CollectionTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Student } from './Student';
import StudentForm from './StudentForm';
import './StudentsManagement.css';
import { Grid, Typography } from '@mui/material';
import { useUserService } from '../users/UserContext';
import StudentDetails from '../registers-management/RegisterDetails';
import { useCallback, useState } from 'react';

const StudentsManagement = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const userService = useUserService();

  const generateColumns = (
    /// show form, set initial values, save item
    rows: (Student & { isNew: boolean })[] | null,
    setRows: React.Dispatch<React.SetStateAction<(Student & { isNew: boolean })[] | null>>,
    setShowItemForm: React.Dispatch<React.SetStateAction<boolean>>,
    setInitialItem: React.Dispatch<React.SetStateAction<Student | null>>,
    setMessage: React.Dispatch<React.SetStateAction<string | null>>
  ): GridColDef[] => {
    return [
      { field: 'studentId', type: 'string', headerName: 'תעודת זהות', flex: 1, editable: true },
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
                setInitialItem(rows!.find((student) => student.id === id) || null);
                setShowItemForm(true);
              }}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon color="action" />}
              label="מחק"
              onClick={(_) => {
                userService
                  .deleteUser(id.toString())
                  .then(() => setRows(rows!.filter((student) => student.id !== id)))
                  .catch((_) => {
                    setMessage('התרחשה שגיאה במחיקת התלמיד');
                  });
              }}
            />
          ];
        }
      }
    ];
  };

  const messageFormat: MessageFormat<Student> = {
    deleteSuccess: () => 'התלמיד נמחק בהצלחה',
    deleteError: () => 'התרחשה שגיאה במחיקת התלמיד',
    updateSuccess: (item: Student) => `התלמיד ${item.firstName} ${item.lastName} עודכן בהצלחה`,
    updateError: (item: Student) => `התרחשה שגיאה בעדכון התלמיד: ${item.firstName} ${item.lastName}`
  };

  const handleRowSelected = useCallback((student: GridRowModel | null) => {
    const { isNew, ...studentData } = student as any;
    setSelectedStudent(studentData as Student);
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={selectedStudent ? 8 : 12}>
          <CollectionTable<Student>
            generateColumns={generateColumns}
            repository={userService.getStudentRepository()}
            FormComponent={StudentForm}
            messageFormat={messageFormat}
            onRowSelected={handleRowSelected}
          />
        </Grid>
        <Grid item xs={4}>
          {selectedStudent && (
            <StudentDetails registrationData={selectedStudent} onClose={() => setSelectedStudent(null)} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default StudentsManagement;
