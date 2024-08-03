import { DocumentData, DocumentReference } from 'firebase/firestore';
import { IStorageService } from '../../storage-service/IStorageService';
import { DocumentInfo } from './DocumentInfo';
import { DocumentRepository } from './DocumentRepository';
import { StudentDocumentRepositories } from './DocumentStudentRepositories';
import { StudentDocumentRepository } from './StudentDocumentRepository';

interface IDocumentInfoService {
  getDocumentRepository(): DocumentRepository;
  getStudentDocumentRepository(studentId: string): StudentDocumentRepository;

  addDocument(document: DocumentInfo, file: File): Promise<DocumentReference<DocumentInfo, DocumentData>>;
  updateDocument(document: DocumentInfo, file?: File): Promise<void>;
  deleteDocument(documentId: string): Promise<void>;
  downloadDocument(document: DocumentInfo): Promise<void>;

  uploadStudentDocument(studentId: string, document: DocumentInfo, file: File): Promise<void>;
  deleteStudentDocument(studentId: string, documentId: string): Promise<void>;
  isDocumentUploadedByStudent(studentId: string, documentId: string): Promise<boolean>;
  downloadStudentDocument(studentId: string, document: DocumentInfo): Promise<void>;
}

class DocumentInfoService implements IDocumentInfoService {
  private readonly documentRepository: DocumentRepository;
  private readonly studentDocumentRepositories: StudentDocumentRepositories;
  private readonly storage: IStorageService;

  constructor(
    documentRepository: DocumentRepository,
    studentDocumentRepositories: StudentDocumentRepositories,
    storage: IStorageService
  ) {
    this.documentRepository = documentRepository;
    this.storage = storage;
    this.studentDocumentRepositories = studentDocumentRepositories;
  }

  getDocumentRepository(): DocumentRepository {
    return this.documentRepository;
  }

  getStudentDocumentRepository(studentId: string): StudentDocumentRepository {
    return this.studentDocumentRepositories.getStudentDocumentRepository(studentId);
  }

  uploadStudentDocument(studentId: string, document: DocumentInfo, file: File): Promise<void> {
    return this.storage.upload(file, `documents/${document.id}/students/${studentId}`).then(() => {
      return this.studentDocumentRepositories.getStudentDocumentRepository(studentId).createWithId(document.id, {
        studentId,
        documentId: document.id,
        filename: file.name,
        documentName: document.name
      });
    });
  }

  deleteStudentDocument(studentId: string, documentId: string): Promise<void> {
    return this.storage.delete(`documents/${documentId}/students/${studentId}`).then(() => {
      return this.studentDocumentRepositories.getStudentDocumentRepository(documentId).delete(studentId);
    });
  }

  addDocument(document: DocumentInfo, file: File): Promise<DocumentReference<DocumentInfo, DocumentData>> {
    return this.documentRepository.create(document).then((doc) => {
      this.storage.upload(file, `documents/${doc.id}/document`);

      return doc;
    });
  }

  isDocumentUploadedByStudent(studentId: string, documentId: string): Promise<boolean> {
    return this.storage.exists(`documents/${documentId}/students/${studentId}`);
  }

  downloadStudentDocument(studentId: string, document: DocumentInfo): Promise<void> {
    return this.storage.download(`documents/${document.id}/students/${studentId}`, document.filename);
  }

  updateDocument(document: DocumentInfo, file?: File | undefined): Promise<void> {
    return this.documentRepository.update(document.id, document).then(() => {
      if (!file) {
        return;
      }

      this.storage.upload(file, `documents/${document.id}/document`);
    });
  }

  deleteDocument(documentId: string): Promise<void> {
    return this.storage
      .delete(`documents/${documentId}`)
      .then(() => {
        return this.documentRepository.delete(documentId);
      })
      .catch((error) => {
        if (error.code === 'storage/object-not-found') {
          return this.documentRepository.delete(documentId);
        }

        throw error;
      });
  }

  downloadDocument(document: DocumentInfo): Promise<void> {
    return this.storage.download(`documents/${document.id}/document`, document.filename);
  }
}

export { DocumentInfoService };
export type { IDocumentInfoService };
