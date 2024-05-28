import { db } from "../firebase";
import { BaseRepository } from "../repositories/BaseRepository";
import { StudyMaterial } from "./StudyMaterial";


export class StudyMaterialRepository extends BaseRepository<StudyMaterial> {
    constructor() {
        super(db, "studyMaterials");
    }    
}