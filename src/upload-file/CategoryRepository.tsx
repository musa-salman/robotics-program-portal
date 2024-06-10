import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { BaseRepository } from '../repositories/BaseRepository';
import { Category } from './Category';
import { StudyMaterial } from '../study-material/StudyMaterial';
import { createConverter } from '../utils/db/firestoreDataConverter';
import { createStudyMaterialConverter } from '../study-material/refactore/StudyMaterialConverter';

// export interface ICategoryRepository { };

export class CategoryRepository extends BaseRepository<Category> {
  
  private readonly supCollection:string="study-materials";

  constructor() {
    super(db, 'categoriesANDstudyMaterials');
  }

  async addStudyMaterial(category:Category,data:StudyMaterial) :Promise<string>{

    const indexRef =doc(this._collection,category.id);
    const studyMaterialRef=collection(indexRef,this.supCollection).withConverter(createStudyMaterialConverter(category.category));
    const docRef = await addDoc(studyMaterialRef,{
      ...data
    });
    return docRef.id;
  }

  deleteStudyMaterial(categoryID:string,docID:string) {
    const indexRef =doc(this._collection,categoryID);
    const studyMaterialRef=collection(indexRef,this.supCollection).withConverter(createConverter<StudyMaterial>());
    deleteDoc(doc(studyMaterialRef, docID));
  }

  updateStudyMaterial(categoryID:string,docID:string,data: Partial<StudyMaterial>){
    const indexRef =doc(this._collection,categoryID);
    const studyMaterialRef=collection(indexRef,this.supCollection).withConverter(createConverter<StudyMaterial>());
    const docRef = doc(studyMaterialRef,docID);
    updateDoc(docRef,data);

  }


}