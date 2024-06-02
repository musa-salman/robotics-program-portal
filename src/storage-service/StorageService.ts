import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import { IStorageService } from './IStorageService';
import { Dispatch, SetStateAction } from 'react';

export class StorageService implements IStorageService {
  async upload(file: File, path: string, setUploadProgress: Dispatch<SetStateAction<number>>): Promise<void> {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot: any) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setUploadProgress(progress);
      },
      (error: any) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  async download(path: string): Promise<void> {
    getDownloadURL(ref(storage, path))
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET', url);
        xhr.send();
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  }

  async delete(path: string): Promise<void> {
    return deleteObject(ref(storage, path));
  }
}
