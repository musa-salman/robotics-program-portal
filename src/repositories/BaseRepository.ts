import { CollectionReference, DocumentData, DocumentReference, Firestore, WithFieldValue, addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { IRead } from "./interfaces/IRead";
import { IWrite } from "./interfaces/IWrite";
import { createConverter } from "../utils/db/firestoreDataConverter";

export abstract class BaseRepository<T extends DocumentData> implements IWrite<T>, IRead<T> {
    public readonly _collection: CollectionReference<DocumentData, DocumentData>;

    constructor(db: Firestore, collectionPath: string) {
        this._collection = collection(db, collectionPath).withConverter(createConverter<T>());
    }

    async find(): Promise<T[]> {
        const snapshot = await getDocs(this._collection);
        return snapshot.docs.map(doc => doc.data() as T);
    }

    async findOne(id: string): Promise<T | null> {
        const docRef = doc(this._collection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as T;
        } else {
            return null;
        }
    }

    async create(item: WithFieldValue<T>): Promise<DocumentReference<DocumentData, DocumentData>> {
        return addDoc(this._collection, item);
    }

    async update(id: string, item: WithFieldValue<T>): Promise<void> {
        return updateDoc(doc(this._collection, id), item);
    }

    async delete(id: string): Promise<void> {
        deleteDoc(doc(this._collection, id));
    }

}