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
import { FeedbackMessage } from '../components/snackbar/SnackBar';

/**
 * Component for managing students.
 *
 * @component
 * @example
 * ```tsx
 * <StudentsManagement />
 * ```
 */
const StudentsManagement = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const userService = useUserService();

  const handleDelete = (student: Student) => {
    return userService.deleteUser(student.id);
  };

  const generateColumns = (
    /// show form, set initial values, save item
    rows: (Student & { isNew: boolean })[] | null,
    _setRows: React.Dispatch<React.SetStateAction<(Student & { isNew: boolean })[] | null>>,
    setShowItemForm: React.Dispatch<React.SetStateAction<boolean>>,
    setInitialItem: React.Dispatch<React.SetStateAction<Student | null>>,
    _showMessage: (message: FeedbackMessage) => void,
    onRowDeleted: (row: GridRowModel) => void
  ): GridColDef[] => {
    return [
      {
        field: 'studentName',
        type: 'string',
        headerName: 'שם תלמיד',
        flex: 1,
        renderCell: ({ row }) => (
          <Typography>
            {row.firstName} {row.lastName}
          </Typography>
        ),
        valueGetter: (_, row) => `${row.firstName} ${row.lastName}`
      },
      { field: 'studentId', type: 'string', headerName: 'תעודת זהות', flex: 1 },
      { field: 'studentPhoneNumber', type: 'string', headerName: 'טלפון תלמיד', flex: 1 },
      { field: 'parentPhoneNumber', type: 'string', headerName: 'טלפון הורה', flex: 1 },
      { field: 'studentEmail', type: 'string', headerName: 'אימייל תלמיד', flex: 1 },
      { field: 'parentEmail', type: 'string', headerName: 'אימייל הורה', flex: 1 },
      { field: 'studentAddress', type: 'string', headerName: 'כתובת', flex: 1 },
      { field: 'studentSchool', type: 'string', headerName: 'בית ספר', flex: 1 },
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
                onRowDeleted(rows!.find((student) => student.id === id)!);
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
    deleteConfirmation: (item: Student) => `האם אתה בטוח שברצונך למחוק את התלמיד ${item.firstName} ${item.lastName}?`,
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
            onDelete={handleDelete}
            columnVisibilityModel={{
              parentPhoneNumber: false,
              parentEmail: false,
              studentSchool: false
            }}
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
