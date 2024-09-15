import { UploadResult, deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';
import { IStorageService } from './IStorageService';

/**
 * StorageService class provides methods for uploading, downloading, deleting, and checking the existence of files in a storage.
 */
export class StorageService implements IStorageService {
  upload(file: File, path: string): Promise<UploadResult> {
    return uploadBytes(ref(storage, path), file).then((uploadResult) => {
      return uploadResult;
    });
  }

  download(path: string, filename?: string): Promise<void> {
    return getDownloadURL(ref(storage, path))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET', url);
        xhr.onload = () => {
          const downloadFile = new Blob([xhr.response]);
          const downloadUrl = URL.createObjectURL(downloadFile);

          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = filename || path.split('/').pop() || 'unknown-download';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(downloadUrl);
        };
        xhr.send();
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  }

  delete(path: string): Promise<void> {
    return deleteObject(ref(storage, path));
  }

  exists(path: string): Promise<boolean> {
    return getDownloadURL(ref(storage, path))
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
