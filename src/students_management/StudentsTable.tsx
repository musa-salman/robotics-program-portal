import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentEmail: string;
  motherEmail: string;
}

interface Props {
  students: Student[];
  onEditStudent: (s: Student) => void;
  onDeleteStudent: (id: string) => void;
}

const StudentTable: React.FC<Props> = ({ students, onEditStudent, onDeleteStudent }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>שם פרטי</TableCell>
            <TableCell>שם משפחה</TableCell>
            <TableCell>דוא"ל תלמיד</TableCell>
            <TableCell>דוא"ל אם</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.studentEmail}</TableCell>
              <TableCell>{student.motherEmail}</TableCell>
              <TableCell>
                <IconButton onClick={() => onDeleteStudent(student.id)}>
                  <Delete color="error" />
                </IconButton>
                <IconButton onClick={() => onEditStudent(student)}>
                  <Edit color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
