import { CategoryRepository } from './CategoryRepository';
import { StudyMaterialRepository } from './StudyMaterialRepository';
import { CachingRepository } from '../../repositories/caching/CachingRepository';
import { WriteBatch, doc, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase';

/**
 * Represents a unit of work for managing study materials.
 */
export interface IUnitOfWork {
  /**
   * Deletes a category by its ID.
   * @param categoryId - The ID of the category to delete.
   * @returns A promise that resolves when the category is deleted.
   */
  deleteCategory(categoryId: string): Promise<void>;

  /**
   * Renames a category.
   * @param oldCategory - The current name of the category.
   * @param newCategory - The new name for the category.
   * @returns A promise that resolves when the category is renamed.
   */
  renameCategory(oldCategory: string, newCategory: string): Promise<void>;
}

/**
 * Represents the management class for study materials.
 * Implements the IUnitOfWork interface.
 */
export class StudyMaterialManagement implements IUnitOfWork {
  readonly categoryRepository: CategoryRepository;
  readonly studyMaterialRepository: StudyMaterialRepository;

  constructor() {
    this.categoryRepository = new CachingRepository(new CategoryRepository());
    this.studyMaterialRepository = new CachingRepository(new StudyMaterialRepository());
  }

  _moveStudyMaterials(oldCategory: string, newCategory: string, batch: WriteBatch): void {
    this.studyMaterialRepository.find().then((studyMaterials) => {
      studyMaterials.forEach((studyMaterial) => {
        if (studyMaterial.category === oldCategory) {
          const ref = doc(this.studyMaterialRepository._collection, studyMaterial.id);
          batch.update(ref, { category: newCategory });
        }
      });
    });
  }

  deleteCategory(categoryId: string): Promise<void> {
    const batch = writeBatch(db);

    return this.categoryRepository.findOne(categoryId).then((category) => {
      if (!category) {
        return;
      }

      this._moveStudyMaterials(category.category, '', batch);

      batch.delete(doc(this.categoryRepository._collection, categoryId));
      return batch.commit();
    });
  }

  renameCategory(oldCategory: string, newCategory: string): Promise<void> {
    const batch = writeBatch(db);

    return this.categoryRepository.findOne(oldCategory).then((category) => {
      if (!category) {
        return;
      }

      this._moveStudyMaterials(oldCategory, newCategory, batch);

      batch.update(doc(this.categoryRepository._collection, oldCategory), { category: newCategory });
      return batch.commit();
    });
  }
}
