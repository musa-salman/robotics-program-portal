import { db } from '../../firebase';
import { BaseRepository } from '../../repositories/BaseRepository';
import { Category } from '../../upload-file/Category';
import { StudyMaterial } from '../StudyMaterial';

export class StudyMaterialRepository extends BaseRepository<StudyMaterial> {
  constructor(category: Category) {
    super(db, 'categories/' + category.id + '/studyMaterials');

    this._collection.withConverter({
      toFirestore: (data: StudyMaterial) => {
        return {
          filename: data.filename,
          title: data.title,
          description: data.description,
          date: data.date
        };
      },
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
          id: snapshot.id,
          filename: data.filename,
          category: {
            id: category.id,
            category: category.category
          } as Category,
          title: data.title,
          description: data.description,
          date: data.date.toDate()
        } as StudyMaterial;
      }
    });
  }
}
