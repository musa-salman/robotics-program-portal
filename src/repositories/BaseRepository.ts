import { AddPrefixToKeys, CollectionReference, DocumentData, DocumentReference, Firestore, WithFieldValue, addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { IRead } from "./interfaces/IRead";
import { IWrite } from "./interfaces/IWrite";
import { createConverter } from "../utils/db/firestoreDataConverter";

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    public readonly _collection: CollectionReference<T, DocumentData>;

    constructor(db: Firestore, collectionPath: string) {
        this._collection = collection(db, collectionPath).withConverter(createConverter<T>());
    }

    async find(): Promise<T[]> {
        const snapshot = await getDocs(this._collection);
        return snapshot.docs.map(doc => doc.data());
    }

    async findOne(id: string): Promise<T | null> {
        return getDoc(
            doc(this._collection, id)
        ).then(
            (docSnap) => docSnap.exists() ?  docSnap.data() as T : null
        );
    }

    async create(item: WithFieldValue<T>): Promise<DocumentReference<T, DocumentData>> {
        return addDoc(this._collection, item);
    }

    async update(id: string, item: T): Promise<void> {
        return updateDoc(doc(this._collection, id), {...item} as { [x: string]: any; } & AddPrefixToKeys<string, any>);
    }

    async delete(id: string): Promise<void> {
        return deleteDoc(doc(this._collection, id));
    }
}