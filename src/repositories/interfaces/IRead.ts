import { DocumentReference } from "firebase/firestore";

export interface IRead<T> {
    find(): Promise<T[]>;

    findOne(id: DocumentReference): Promise<T>;
}