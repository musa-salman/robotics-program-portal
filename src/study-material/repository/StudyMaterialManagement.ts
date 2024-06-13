import { DocumentData, DocumentReference, doc, writeBatch } from 'firebase/firestore';
import { StudyMaterial } from '../StudyMaterial';
import { CategoryRepository } from './CategoryRepository';
import { StudyMaterialRepository } from './StudyMaterialRepository';
import { db } from '../../firebase';

export interface IUnitOfWork {
  addStudyMaterialToCategory(
    categoryId: string,
    data: StudyMaterial
  ): Promise<DocumentReference<StudyMaterial, DocumentData>>;
  deleteStudyMaterialFromCategory(categoryId: string, materialId: string): Promise<void>;
  updateStudyMaterialInCategory(categoryId: string, materialId: string, data: Partial<StudyMaterial>): Promise<void>;
  findStudyMaterialInCategory(categoryId: string): Promise<StudyMaterial[]>;
  getStudyMaterialsByCategory(): Promise<Map<string, StudyMaterial[]>>;
  moveMaterialToCategory(studyMaterial: StudyMaterial, oldCategoryId: string, newCategoryId: string): Promise<void>;
}

export class StudyMaterialManagement implements IUnitOfWork {
  categoryRepository: CategoryRepository;
  studyMaterialRepositories: Map<string, StudyMaterialRepository>;

  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.studyMaterialRepositories = new Map<string, StudyMaterialRepository>();
  }

  getStudyMaterialRepository(categoryId: string): StudyMaterialRepository {
    let studyMaterialRepository = this.studyMaterialRepositories.get(categoryId);
    if (!studyMaterialRepository) {
      studyMaterialRepository = new StudyMaterialRepository(categoryId);
      this.studyMaterialRepositories.set(categoryId, studyMaterialRepository);
    }
    return studyMaterialRepository;
  }

  async addStudyMaterialToCategory(
    categoryId: string,
    data: StudyMaterial
  ): Promise<DocumentReference<StudyMaterial, DocumentData>> {
    const studyMaterialRepository = await this.getStudyMaterialRepository(categoryId);
    return studyMaterialRepository.create(data);
  }

  async deleteStudyMaterialFromCategory(categoryId: string, materialId: string): Promise<void> {
    const studyMaterialRepository = await this.getStudyMaterialRepository(categoryId);
    await studyMaterialRepository.delete(materialId);
  }

  async updateStudyMaterialInCategory(
    categoryId: string,
    materialId: string,
    data: Partial<StudyMaterial>
  ): Promise<void> {
    const studyMaterialRepository = await this.getStudyMaterialRepository(categoryId);
    await studyMaterialRepository.update(materialId, data);
  }

  async findStudyMaterialInCategory(categoryId: string): Promise<StudyMaterial[]> {
    const studyMaterialRepository = await this.getStudyMaterialRepository(categoryId);
    return studyMaterialRepository.find();
  }

  async getStudyMaterialsByCategory(): Promise<Map<string, StudyMaterial[]>> {
    {
      let studyMaterials = new Map<string, StudyMaterial[]>();
      const categories = await this.categoryRepository.find();
      for (const category of categories) {
        const materials = await this.findStudyMaterialInCategory(category.id);
        studyMaterials.set(category.id, materials);
      }
      return studyMaterials;
    }
  }

  async moveMaterialToCategory(
    studyMaterial: StudyMaterial,
    oldCategoryId: string,
    newCategoryId: string
  ): Promise<void> {
    const oldStudyMaterialRepository = await this.getStudyMaterialRepository(oldCategoryId);
    const newStudyMaterialRepository = await this.getStudyMaterialRepository(newCategoryId);

    const batch = writeBatch(db);
    const oldDocRef = doc(oldStudyMaterialRepository._collection, studyMaterial.id);
    const newDocRef = doc(newStudyMaterialRepository._collection, studyMaterial.id);

    // without id or category
    const { id, category, ...remainingProperties } = studyMaterial;

    batch.delete(oldDocRef).set(newDocRef, remainingProperties);
    return batch.commit();
  }
}
