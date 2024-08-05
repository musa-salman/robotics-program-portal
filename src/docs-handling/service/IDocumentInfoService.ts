import { DocumentData, DocumentReference } from 'firebase/firestore';
import { DocumentInfo } from './DocumentInfo';
import { DocumentRepository } from './DocumentRepository';
import { StudentDocumentRepository } from './StudentDocumentRepository';

/**
 * Represents a service for handling documents.
 */
interface IDocumentInfoService {
  /**
   * Retrieves the document repository.
   * @returns {DocumentRepository} The document repository.
   */
  getDocumentRepository(): DocumentRepository;

  /**
   * Retrieves the document repository for a specific student.
   * @param {string} studentId - The ID of the student.
   * @returns {StudentDocumentRepository} The student document repository.
   */
  getStudentDocumentRepository(studentId: string): StudentDocumentRepository;

  /**
   * Adds a new document.
   * @param {DocumentInfo} document - The document information.
   * @param {File} file - The file associated with the document.
   * @returns {Promise<DocumentReference<DocumentInfo, DocumentData>>} A promise that resolves to the document reference.
   */
  addDocument(document: DocumentInfo, file: File): Promise<DocumentReference<DocumentInfo, DocumentData>>;

  /**
   * Updates an existing document.
   * @param {DocumentInfo} document - The document information.
   * @param {File} [file] - The optional file associated with the document.
   * @returns {Promise<void>} A promise that resolves when the document is updated.
   */
  updateDocument(document: DocumentInfo, file?: File): Promise<void>;

  /**
   * Deletes a document.
   * @param {string} documentId - The ID of the document to delete.
   * @returns {Promise<void>} A promise that resolves when the document is deleted.
   */
  deleteDocument(documentId: string): Promise<void>;

  /**
   * Downloads a document.
   * @param {DocumentInfo} document - The document information.
   * @returns {Promise<void>} A promise that resolves when the document is downloaded.
   */
  downloadDocument(document: DocumentInfo): Promise<void>;

  /**
   * Uploads a document for a specific student.
   * @param {string} studentId - The ID of the student.
   * @param {DocumentInfo} document - The document information.
   * @param {File} file - The file associated with the document.
   * @returns {Promise<void>} A promise that resolves when the document is uploaded.
   */
  uploadStudentDocument(studentId: string, document: DocumentInfo, file: File): Promise<void>;

  /**
   * Deletes a document for a specific student.
   * @param {string} studentId - The ID of the student.
   * @param {string} documentId - The ID of the document to delete.
   * @returns {Promise<void>} A promise that resolves when the document is deleted.
   */
  deleteStudentDocument(studentId: string, documentId: string): Promise<void>;

  /**
   * Checks if a document was uploaded by a specific student.
   * @param {string} studentId - The ID of the student.
   * @param {string} documentId - The ID of the document.
   * @returns {Promise<boolean>} A promise that resolves to true if the document was uploaded by the student, otherwise false.
   */
  isDocumentUploadedByStudent(studentId: string, documentId: string): Promise<boolean>;

  /**
   * Downloads a document for a specific student.
   * @param {string} studentId - The ID of the student.
   * @param {DocumentInfo} document - The document information.
   * @returns {Promise<void>} A promise that resolves when the document is downloaded.
   */
  downloadStudentDocument(studentId: string, document: DocumentInfo): Promise<void>;
}

export type { IDocumentInfoService };
