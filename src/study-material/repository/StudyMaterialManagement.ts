import { DocumentData, DocumentReference, doc, writeBatch } from 'firebase/firestore';
import { StudyMaterial } from '../StudyMaterial';
import { CategoryRepository } from './CategoryRepository';
import { StudyMaterialRepository } from './StudyMaterialRepository';
import { db } from '../../firebase';
import { CachingRepository } from '../../repositories/caching/CachingRepository';

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

  moveAllMaterialsToCategory(oldCategoryId: string, newCategoryId: string): Promise<void>;
}

/**
 * Represents the management class for study materials.
 * Implements the IUnitOfWork interface.
 */
export class StudyMaterialManagement implements IUnitOfWork {
  readonly categoryRepository: CategoryRepository;
  readonly studyMaterialRepositories: Map<string, StudyMaterialRepository>;

  constructor() {
    this.categoryRepository = new CachingRepository(new CategoryRepository());
    this.studyMaterialRepositories = new Map<string, StudyMaterialRepository>();
  }

  /**
   * Retrieves study materials grouped by category.
   * @returns A Promise that resolves to a Map containing study materials grouped by category.
   */
  async getStudyMaterialsByCategory(): Promise<Map<string, StudyMaterial[]>> {
    let studyMaterials = new Map<string, StudyMaterial[]>();

    this.categoryRepository.find().then((categories) => {
      categories.forEach(async (category) => {
        this.findStudyMaterialInCategory(category.id).then((materials) =>
          studyMaterials.set(category.category, materials)
        );
      });
    });

    return studyMaterials;
  }

  /**
   * Adds a study material to a category.
   *
   * @param categoryId - The ID of the category to add the study material to.
   * @param data - The study material data to add.
   * @returns A promise that resolves to the reference of the created study material document.
   */
  async addStudyMaterialToCategory(
    categoryId: string,
    data: StudyMaterial
  ): Promise<DocumentReference<StudyMaterial, DocumentData>> {
    return this.getStudyMaterialRepository(categoryId).create(data);
  }

  /**
   * Deletes a study material from a category.
   *
   * @param categoryId - The ID of the category.
   * @param materialId - The ID of the study material to delete.
   * @returns A Promise that resolves to void.
   */
  async deleteStudyMaterialFromCategory(categoryId: string, materialId: string): Promise<void> {
    await this.getStudyMaterialRepository(categoryId).delete(materialId);
  }

  /**
   * Updates a study material in a specific category.
   *
   * @param categoryId - The ID of the category.
   * @param materialId - The ID of the material to update.
   * @param data - The partial data of the study material to update.
   * @returns A promise that resolves to void.
   */
  async updateStudyMaterialInCategory(
    categoryId: string,
    materialId: string,
    data: Partial<StudyMaterial>
  ): Promise<void> {
    return this.getStudyMaterialRepository(categoryId).update(materialId, data);
  }

  /**
   * Finds study materials in a specific category.
   * @param categoryId - The ID of the category to search in.
   * @returns A promise that resolves to an array of StudyMaterial objects.
   */
  async findStudyMaterialInCategory(categoryId: string): Promise<StudyMaterial[]> {
    return this.getStudyMaterialRepository(categoryId).find();
  }

  /**
   * Moves a study material from one category to another.
   *
   * @param studyMaterial - The study material to be moved.
   * @param oldCategoryId - The ID of the old category.
   * @param newCategoryId - The ID of the new category.
   * @returns A promise that resolves when the study material has been moved successfully.
   */
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

  /**
   * Moves all study materials from one category to another.
   *
   * @param oldCategoryId - The ID of the old category.
   * @param newCategoryId - The ID of the new category.
   * @returns A promise that resolves when all study materials have been moved successfully.
   */
  async moveAllMaterialsToCategory(oldCategoryId: string, newCategoryId: string): Promise<void> {
    this.findStudyMaterialInCategory(oldCategoryId).then((studyMaterials) => {
      studyMaterials.forEach((studyMaterial) => {
        this.moveMaterialToCategory(studyMaterial, oldCategoryId, newCategoryId);
      });
    });
  }

  /**
   * Retrieves the study material repository for the specified category ID.
   * If the repository does not exist, a new one is created and stored.
   *
   * @param categoryId - The ID of the category.
   * @returns The study material repository for the specified category ID.
   */
  getStudyMaterialRepository(categoryId: string): StudyMaterialRepository {
    let studyMaterialRepository = this.studyMaterialRepositories.get(categoryId);
    if (!studyMaterialRepository) {
      studyMaterialRepository = new StudyMaterialRepository(categoryId);
      this.studyMaterialRepositories.set(categoryId, studyMaterialRepository);
    }
    return studyMaterialRepository;
  }
}
