/**
 * Represents a user repository.
 */
export interface IUserRepository {
  /**
   * Retrieves the role of a user based on their unique identifier.
   * @param uid - The unique identifier of the user.
   * @returns A promise that resolves to the role of the user.
   */
  getUserRole(uid: string): Promise<string>;
}
