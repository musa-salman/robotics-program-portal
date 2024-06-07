import React, { useState } from 'react';
import './StudentContainer.css';
import StudentTable, { Student } from './StudentsTable';

const StudentContainer: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      firstName: 'מוסא',
      lastName: 'סלמאן',
      studentEmail: 'mosa@example.com',
      motherEmail: 'mother@example.com'
    },
    {
      id: '2',
      firstName: 'אחמד',
      lastName: 'סלמאן',
      studentEmail: 'ahmad@gmail.com',
      motherEmail: 'mahmad@gmail.com'
    },
    {
      id: '3',
      firstName: 'יהודה',
      lastName: 'כהן',
      studentEmail: 'yehuda@hotmail.com',
      motherEmail: 'yehudam@gmail.com'
    }

    // Add more sample students here
  ]);

  const deleteStudent = (id: String) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const editStudent = (student: Student) => {
    setStudents(students.map((s) => (s.id === student.id ? student : s)));
  };

  return (
    <div className="student-container">
      <StudentTable students={students} onEditStudent={editStudent} onDeleteStudent={deleteStudent} />
    </div>
  );
};

export default StudentContainer;
