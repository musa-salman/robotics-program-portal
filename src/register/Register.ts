/**
 * Represents a registration entry.
 *
 * @remarks
 * This interface defines the structure of a registration entry in the system.
 * It contains various properties such as the student's information, contact details,
 * and additional information related to the registration.
 */
export interface Register {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  studentPhoneNumber: string;
  parentPhoneNumber: string;
  studentEmail: string;
  parentEmail: string;
  studentAddress: string;
  studentSchool: string;

  studyUnitsMajor: string;
  numStudyUnitsMath: string;
  hearAboutUs: string;
  otherQuestions: string;
}
