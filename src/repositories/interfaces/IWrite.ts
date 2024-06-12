import { DocumentData, DocumentReference } from 'firebase/firestore';

/**
 * Represents a generic interface for performing write operations on a data source.
 * @template T - The type of data being written.
 */
export interface IWrite<T> {
  /**
   * Creates a new item in the data source.
   * @param item - The item to be created.
   * @returns A promise that resolves to the reference of the created item.
   */
  create(item: T): Promise<DocumentReference<T, DocumentData>>;

  /**
   * Creates multiple items in the data source.
   * @param items - The items to be created.
   * @returns A promise that resolves to the references of the created items.
   */
  createMany(items: T[]): Promise<DocumentReference<T, DocumentData>[]>;

  /**
   * Updates an existing item in the data source.
   * @param id - The ID of the item to be updated.
   * @param item - The updated item.
   * @returns A promise that resolves when the update is complete.
   */
  update(id: string, item: T): Promise<void>;

  /**
   * Deletes an item from the data source.
   * @param id - The ID of the item to be deleted.
   * @returns A promise that resolves when the deletion is complete.
   */
  delete(id: string): Promise<void>;

  /**
   * Deletes multiple items from the data source.
   * @param ids - The IDs of the items to be deleted.
   * @returns A promise that resolves when the deletion is complete.
   */
  deleteMany(ids: string[]): Promise<void>;

  /**
   * Deletes all items from the data source.
   * @returns A promise that resolves when the deletion is complete.
   */
  deleteAll(): Promise<void>;
}
