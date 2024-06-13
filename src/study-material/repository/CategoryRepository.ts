import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { Category } from '../../upload-file/Category';
import { StudyMaterial } from '../StudyMaterial';
import { createStudyMaterialConverter } from '../refactore/StudyMaterialConverter';

export class CategoryRepository extends BaseRepository<Category> {
  private readonly supCollection: string = 'study-materials';

  constructor() {
    super(db, 'categoriesANDstudyMaterials');
  }

  async findStudyMaterial(category: Category) {
    const indexRef = doc(this._collection, category.id);
    const studyMaterialRef = collection(indexRef, this.supCollection).withConverter(
      createStudyMaterialConverter(category.category)
    );
    const snapshot = await getDocs(studyMaterialRef);
    return snapshot.docs.map((doc) => doc.data());
  }

  async addStudyMaterial(category: Category, data: StudyMaterial): Promise<string> {
    const indexRef = doc(this._collection, category.id);
    const studyMaterialRef = collection(indexRef, this.supCollection).withConverter(
      createStudyMaterialConverter(category.category)
    );
    const docRef = await addDoc(studyMaterialRef, {
      ...data
    });
    return docRef.id;
  }

  deleteStudyMaterial(category: Category, docID: string) {
    const indexRef = doc(this._collection, category.id);
    const studyMaterialRef = collection(indexRef, this.supCollection).withConverter(
      createStudyMaterialConverter(category.category)
    );
    deleteDoc(doc(studyMaterialRef, docID));
  }

  updateStudyMaterial(category: Category, docID: string, data: Partial<StudyMaterial>) {
    const indexRef = doc(this._collection, category.id);
    const studyMaterialRef = collection(indexRef, this.supCollection).withConverter(
      createStudyMaterialConverter(category.category)
    );
    const docRef = doc(studyMaterialRef, docID);
    updateDoc(docRef, data);
  }

  async moveStudyMaterial(categorysorc: Category, categorydest: Category, docID: string, data: StudyMaterial) {
    const batch = writeBatch(db);
    const indexsorcRef = doc(this._collection, categorysorc.id);
    const studyMaterialsorcRef = collection(indexsorcRef, this.supCollection).withConverter(
      createStudyMaterialConverter(categorysorc.category)
    );
    batch.delete(doc(studyMaterialsorcRef, docID));
    const indexdestRef = doc(this._collection, categorydest.id);
    const studyMaterialdestRef = collection(indexdestRef, this.supCollection).withConverter(
      createStudyMaterialConverter(categorydest.category)
    );
    const docRef = doc(studyMaterialdestRef, docID);
    batch.set(docRef, {
      ...data
    });
    await batch.commit();
  }

  async moveAllStudyMaterial(categorysorc: Category, categorydest: Category) {
    const data = this.findStudyMaterial(categorysorc);
    data
      .then((result) => {
        result.forEach((index) => {
          this.moveStudyMaterial(categorysorc, categorydest, index.id, index);
        });
      })
      .catch((error) => {
        console.log('error move', error);
      });
  }
}
