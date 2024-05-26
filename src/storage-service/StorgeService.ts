import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { IStorageService } from "./IStorgeService";
import { Dispatch, SetStateAction } from "react";


class StorageService implements IStorageService{
    download(path: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(path: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async upload(file: File, path: string, setUploadProgress: Dispatch<SetStateAction<number>>): Promise<void> {
        const storageRef = ref(storage,path);    
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          'state_changed',
          (snapshot:any) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setUploadProgress(progress);
          },
          (error:any) => {
            console.error('Error uploading file:', error);
        },
        //   () => {
        //     // Upload completed successfully, now get the download URL
        //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //       console.log('File available at', downloadURL);
        //     });
        //   }
        );
      };



        
    }

   
        
       
        






