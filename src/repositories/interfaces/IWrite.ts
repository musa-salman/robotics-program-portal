import { DocumentReference } from "firebase/firestore";

export interface IWrite<T> {
    create(item: T): Promise<DocumentReference>;
    update(id: string, item: T): Promise<void>;
    delete(id: string): Promise<void>;
}