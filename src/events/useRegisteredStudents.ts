// useRegisteredStudents.ts
import { useState, useEffect, useContext } from 'react';
import { StudentEventContext } from './StudentEventContext'; // Adjust the path as needed

export interface StudentEventProps {
  StudentId: string;
  EventId: string;
}

export const useRegisteredStudents = (eventId: string) => {
  const [registeredStudents, setRegisteredStudents] = useState<StudentEventProps[] | null>(null);
  const StudentEventRepository = useContext(StudentEventContext);

  const getUserId = () => {
    // Implement your logic to get user ID here
    return 'getUserID';
  };

  const StudentEvent: StudentEventProps = {
    StudentId: getUserId(),
    EventId: eventId
  };

  const checkIfRegistered = () => {
    return registeredStudents?.some((user) => user.StudentId === StudentEvent.StudentId) ?? false;
  };

  useEffect(() => {
    const getRegisteredStudents = async () => {
      const students = await StudentEventRepository.find();
      setRegisteredStudents(students.filter((student) => student.EventId === eventId));
    };

    if (registeredStudents === null) getRegisteredStudents();
  }, [registeredStudents, eventId, StudentEventRepository]);

  const handleSaveRegister = async (
    setShowModalRegister: (value: boolean) => void,
    setRegister: (value: boolean) => void
  ) => {
    setShowModalRegister(false);
    if (registeredStudents && !registeredStudents.some((user) => user.StudentId === StudentEvent.StudentId)) {
      await StudentEventRepository.create(StudentEvent);
      setRegisteredStudents([...registeredStudents, StudentEvent]);
      setRegister(true);
    } else {
      setRegister(true);
    }
  };

  return { registeredStudents, checkIfRegistered, handleSaveRegister };
};
