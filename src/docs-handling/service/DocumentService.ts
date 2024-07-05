import { DocumentData, DocumentReference } from 'firebase/firestore';
import { IStorageService } from '../../storage-service/IStorageService';
import { DocumentInfo } from './DocumentInfo';
import { DocumentRepository } from './DocumentRepository';
import { DocumentStudentRepositories } from './DocumentStudentRepositories';
import { DocumentStudentRepository } from './DocumentStudentRepository';
import { UploadResult } from 'firebase/storage';

interface IDocumentInfoService {
  getDocumentRepository(): DocumentRepository;
  getDocumentStudentRepository(documentId: string): DocumentStudentRepository;

  addDocument(document: DocumentInfo, file: File): Promise<DocumentReference<DocumentInfo, DocumentData>>;
  updateDocument(document: DocumentInfo, file?: File): Promise<void>;
  deleteDocument(documentId: string): Promise<void>;

  uploadStudentDocument(studentId: string, documentId: string, file: File): Promise<UploadResult>;
  deleteStudentDocument(studentId: string, documentId: string): Promise<void>;
  isStudentDocumentUploaded(documentId: string, studentId: string): Promise<boolean>;
}

class DocumentInfoService implements IDocumentInfoService {
  private readonly documentRepository: DocumentRepository;
  private readonly documentStudentRepositories: DocumentStudentRepositories;
  private readonly storage: IStorageService;

  constructor(
    documentRepository: DocumentRepository,
    documentStudentRepositories: DocumentStudentRepositories,
    storage: IStorageService
  ) {
    this.documentRepository = documentRepository;
    this.storage = storage;
    this.documentStudentRepositories = documentStudentRepositories;
  }

  getDocumentRepository(): DocumentRepository {
    return this.documentRepository;
  }

  getDocumentStudentRepository(documentId: string): DocumentStudentRepository {
    return this.documentStudentRepositories.getDocumentStudentRepository(documentId);
  }

  uploadStudentDocument(studentId: string, documentId: string, file: File): Promise<UploadResult> {
    return this.storage.upload(file, `documents/${documentId}/${studentId}`);
  }

  deleteStudentDocument(studentId: string, documentId: string): Promise<void> {
    return this.storage.delete(`documents/${documentId}/${studentId}`);
  }

  addDocument(document: DocumentInfo, file: File): Promise<DocumentReference<DocumentInfo, DocumentData>> {
    return this.documentRepository.create(document).then((doc) => {
      this.storage.upload(file, `documents/${doc.id}`);

      return doc;
    });
  }

  updateDocument(document: DocumentInfo, file?: File | undefined): Promise<void> {
    return this.documentRepository.update(document.id, document).then(() => {
      if (!file) {
        return;
      }

      this.storage.upload(file, `documents/${document.id}`);
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
    // TODO: delete all uploaded files for this document by students
  }

  isStudentDocumentUploaded(documentId: string, studentId: string): Promise<boolean> {
    return this.storage.exists(`documents/${documentId}/${studentId}`);
  }
}

export { DocumentInfoService };
export type { IDocumentInfoService };
