import { db } from "../firebase";
import { BaseRepository } from "../repositories/BaseRepository";
import { StudyMaterial } from "./StudyMaterial";


export class StudyMaterialRepository extends BaseRepository<StudyMaterial> {
    static Provider: any;
    constructor() {
        super(db, "files");
    }

    // const handleFileChange = (event:any,setFileData:React.Dispatch<React.SetStateAction<number>>,setFile:React.Dispatch<React.SetStateAction<number>>) => {
    //     try{
    //       if (event.target.files && event.target.files[0]) {
    //         setFileData(prevData => ({ ...prevData, filename: event.target.files[0].name }));
    //         setFile(event.target.files[0]);
            
    //       }
    //     }catch(error:any){
    //       console.error('error handling file change',error);
    //     }
    //   };
    

}
