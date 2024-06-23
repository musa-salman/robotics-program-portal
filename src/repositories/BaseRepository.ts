import {
  AddPrefixToKeys,
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  PartialWithFieldValue,
  WithFieldValue,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { IRead } from './interfaces/IRead';
import { IWrite } from './interfaces/IWrite';
import { createConverter } from '../utils/db/firestoreDataConverter';

export interface IRepositoryBase<T> extends IRead<T>, IWrite<T> {}

/**
 * Represents a base repository class that provides common CRUD operations for a specific collection in Firestore.
 *
 * @template T - The type of the data stored in the collection.
 */
export abstract class BaseRepository<T> implements IRepositoryBase<T> {
  public readonly _collection: CollectionReference<T, DocumentData>;

  constructor(db: Firestore, collectionPath: string, converter?: FirestoreDataConverter<T>) {
    this._collection = collection(db, collectionPath).withConverter(converter || createConverter<T>());
  }

  async find(): Promise<T[]> {
    const snapshot = await getDocs(this._collection);
    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(id: string | undefined): Promise<T | null> {
    if (!id) return null;
    return getDoc(doc(this._collection, id)).then((docSnap) => (docSnap.exists() ? (docSnap.data() as T) : null));
  }

  async create(item: PartialWithFieldValue<T>): Promise<DocumentReference<T, DocumentData>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return addDoc(this._collection, item as WithFieldValue<T> & AddPrefixToKeys<string, any>);
  }

  async createWithId(id: string, item: PartialWithFieldValue<T>): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return setDoc(doc(this._collection, id), item as WithFieldValue<T> & AddPrefixToKeys<string, any>);
  }

  async createMany(items: PartialWithFieldValue<T>[]): Promise<DocumentReference<T, DocumentData>[]> {
    // TODO: test this method, if it syncs all the items correctly, with the correct IDs.
    return Promise.all(
      items.map((item) => {
        return this.create(item);
      })
    );
  }

  async update(id: string, item: PartialWithFieldValue<T>): Promise<void> {
    if ((item as any).id) delete (item as Record<string, unknown>).id;

    const firestoreItem = this._collection.converter!.toFirestore(item as T);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return updateDoc(doc(this._collection, id), firestoreItem as any);
  }

  async delete(id: string): Promise<void> {
    return deleteDoc(doc(this._collection, id));
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => this.delete(id));
  }

  async deleteAll(): Promise<void> {
    const snapshot = await getDocs(this._collection);

    snapshot.docs.forEach((doc) => this.delete(doc.ref.id));
  }
}
