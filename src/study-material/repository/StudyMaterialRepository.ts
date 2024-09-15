import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { StudyMaterial } from './StudyMaterial';

/**
 * StudyMaterialRepository class represents a repository for managing study materials.
 * It extends the BaseRepository class and provides methods for CRUD operations on study materials.
 */
export class StudyMaterialRepository extends BaseRepository<StudyMaterial> {
  constructor() {
    super(db, 'studyMaterials');
  }
}
