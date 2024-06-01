/**
 * Represents a generic interface for reading data.
 * @template T - The type of data being read.
 */
export interface IRead<T> {
  /**
   * Finds and returns an array of data.
   * @returns A promise that resolves to an array of data.
   */
  find(): Promise<T[]>;

  /**
   * Finds and returns a single data item by its ID.
   * @param id - The ID of the data item to find.
   * @returns A promise that resolves to the found data item, or null if not found.
   */
  findOne(id: string): Promise<T | null>;
}
