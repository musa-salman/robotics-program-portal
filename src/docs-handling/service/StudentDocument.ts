/**
 * Represents a student document.
 *
 * @remarks
 * This interface defines the structure of a student document, including its ID, student ID, document ID, document name, and filename.
 */
export interface StudentDocument {
  id: string;
  studentId: string;
  documentId: string;
  documentName: string;
  filename: string;
}
