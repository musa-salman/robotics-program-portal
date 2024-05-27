import { DocumentData, DocumentReference } from "firebase/firestore";
import { IRead } from "./interfaces/IRead";
import { IWrite } from "./interfaces/IWrite";

export class MockRepository<T> implements IRead<T>, IWrite<T> {
    private data: { [id: string]: T } = {};
    private idCounter: number = 0;

    async find(): Promise<T[]> {
        return Object.values(this.data);
    }

    async findOne(id: string): Promise<T | null> {
        return this.data[id] || null;
    }

    async create(item: T): Promise<DocumentReference<T, DocumentData>> {
        const id = (this.idCounter++).toString();
        this.data[id] = item;
        return id as unknown as DocumentReference<T, DocumentData>;
    }

    async update(id: string, item: T): Promise<void> {
        if (this.data[id]) {
            this.data[id] = item;
        } else {
            throw new Error(`Item with id ${id} does not exist.`);
        }
    }

    async delete(id: string): Promise<void> {
        if (this.data[id]) {
            delete this.data[id];
        } else {
            throw new Error(`Item with id ${id} does not exist.`);
        }
    }
}