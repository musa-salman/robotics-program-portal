import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions
} from 'firebase/firestore';

export function createConverter<T>(): FirestoreDataConverter<T, DocumentData> {
  return {
    toFirestore(data: T): DocumentData {
      // remove id from data
      const temp = { ...data } as any;
      delete temp.id;
      return { ...temp } as DocumentData;
    },

    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): T {
      const data = snapshot.data(options)!;
      return { id: snapshot.id, ...data } as T;
    }
  };
}
