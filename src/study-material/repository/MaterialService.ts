import { CategoryRepository } from './CategoryRepository';
import { StudyMaterialRepository } from './StudyMaterialRepository';
import { WriteBatch, doc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase';
import { StudyMaterial } from './StudyMaterial';
import { Category } from './Category';

export interface IMaterialService {
  /**
   * Deletes a category.
   * @param categoryId - The ID of the category to delete.
   * @returns A promise that resolves when the category is deleted.
   */
  deleteCategory(categoryId: string): Promise<void>;

  /**
   * Moves a study material to a new category.
   * @param studyMaterial - The study material to move.
   * @param newCategory - The new category for the study material.
   * @returns A promise that resolves when the study material is moved.
   */
  moveStudyMaterial(studyMaterial: StudyMaterial, newCategory: string): Promise<void>;

  /**
   * Renames a category.
   * @param oldCategory - The old category to rename.
   * @param newCategory - The new name for the category.
   * @returns A promise that resolves when the category is renamed.
   */
  renameCategory(oldCategory: Category, newCategory: string): Promise<void>;
}

/**
 * Represents a study material management service.
 */
export class MaterialService implements IMaterialService {
  readonly categoryRepository: CategoryRepository;
  readonly studyMaterialRepository: StudyMaterialRepository;

  constructor(categoryRepository: CategoryRepository, studyMaterialRepository: StudyMaterialRepository) {
    this.categoryRepository = categoryRepository;
    this.studyMaterialRepository = studyMaterialRepository;
  }

  _moveStudyMaterials(oldCategory: string, newCategory: string, batch: WriteBatch): Promise<void> {
    this.studyMaterialRepository.find().then((studyMaterials) => {
      studyMaterials.forEach((studyMaterial) => {
        if (studyMaterial.category === oldCategory) {
          const ref = doc(this.studyMaterialRepository._collection, studyMaterial.id);
          batch.update(ref, { category: newCategory });
        }
      });
    });

    return Promise.resolve();
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const defaultCategory = 'הכל';
    const batch = writeBatch(db);

    const category = await this.categoryRepository.findOne(categoryId);
    if (!category) {
      return;
    }
    return this._moveStudyMaterials(category.category, defaultCategory, batch).then(() => {
      batch.delete(doc(this.categoryRepository._collection, categoryId));
      return batch.commit();
    });
  }

  async moveStudyMaterial(studyMaterial: StudyMaterial, newCategory: string): Promise<void> {
    return this.studyMaterialRepository.update(studyMaterial.id, { ...studyMaterial, category: newCategory });
  }

  async renameCategory(oldCategory: Category, newCategory: string): Promise<void> {
    const batch = writeBatch(db);

    this._moveStudyMaterials(oldCategory.category, newCategory, batch);
    batch.update(doc(this.categoryRepository._collection, oldCategory.id), { category: newCategory });
    return batch.commit();
  }
}
