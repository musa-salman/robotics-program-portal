import { getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { storage } from '../firebase';


const uploadFile = async (file:File | null,setUploadProgress:React.Dispatch<React.SetStateAction<number>>,name:string|undefined) => {
    
    if (!file) return;
    const storageRef = ref(storage,name);
    
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
      () => {
        // Upload completed successfully, now get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  };

  const download=async (name:string,id:string)=>{
    const path:string="/study-material/"+id+"-"+name;
    getDownloadURL(ref(storage, path))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
  
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
  
      
    })
    .catch((error) => {
      // Handle any errors
    });
  

  };


  export default uploadFile