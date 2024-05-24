import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import firebase from "firebase/compat/app";

export function createConverter<T extends firebase.firestore.DocumentData>(): FirestoreDataConverter<T> {
    return {
        toFirestore(data: T): firebase.firestore.DocumentData {
            return { ...data };
        },
        fromFirestore(
            snapshot: QueryDocumentSnapshot,
            options: SnapshotOptions
        ): T {
            const data = snapshot.data(options)!;
            return { ...data } as T;
        }
    };
}
