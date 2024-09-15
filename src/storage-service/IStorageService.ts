import { UploadResult } from 'firebase/storage';

/**
 * Interface for a storage service.
 */
interface IStorageService {
  upload(file: File, path: string): Promise<UploadResult>;

  download(path: string, filename?: string): Promise<void>;

  delete(path: string): Promise<void>;

  exists(path: string): Promise<boolean>;
}

export type { IStorageService };
