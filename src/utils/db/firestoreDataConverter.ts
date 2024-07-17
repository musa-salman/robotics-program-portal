import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';

export function createConverter<T>(): FirestoreDataConverter<T, DocumentData> {
  return {
    toFirestore(data: T): DocumentData {
      // remove id from data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { id, ...rest } = data as any;
      return { ...rest } as DocumentData;
    },

    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
      const data = snapshot.data(options)!;
      if (data['date']) {
        data['date'] = data['date'].toDate();
      }
      if (data['startDate']) {
        data['startDate'] = data['startDate'].toDate();
      }
      if (data['endDate']) {
        data['endDate'] = data['endDate'].toDate();
      }
      return { id: snapshot.id, ...data } as T;
    }
  };
}
