import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { StudyMaterial } from '../StudyMaterial';

export class StudyMaterialRepository extends BaseRepository<StudyMaterial> {
  constructor(categoryID: string) {
    super(db, 'categories/' + categoryID + '/studyMaterials');
  }
}
