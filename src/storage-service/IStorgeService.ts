import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

export interface  IStorageService  {
    
    
  upload(file:File,path:string,setUploadProgress:React.Dispatch<React.SetStateAction<number>>):Promise<void>;

  download(path:string):Promise<void> ;
 
  delete(path:string):Promise<void>; 




};
