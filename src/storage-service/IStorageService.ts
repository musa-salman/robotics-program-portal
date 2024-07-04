import { UploadResult } from 'firebase/storage';

interface IStorageService {
  upload(file: File, path: string): Promise<UploadResult>;

  download(path: string, filename?: string): Promise<void>;

  delete(path: string): Promise<void>;
}

export type { IStorageService };
