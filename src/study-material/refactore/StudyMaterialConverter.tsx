import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { StudyMaterial } from '../StudyMaterial';


export function createStudyMaterialConverter(category:string): FirestoreDataConverter<StudyMaterial, DocumentData> {
  return {
    toFirestore(data: StudyMaterial): DocumentData {
      // remove id from data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const temp = { ...data } as any;
      delete temp.id;
      delete temp.category;
      return { ...temp } as DocumentData;
    },

    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): StudyMaterial {
      const data = snapshot.data(options)!;
      if (data['date']) {
        data['date'] = data['date'].toDate();
      }
      data['category'] =category;
      return { id: snapshot.id, ...data } as StudyMaterial;
    }
  };
}
