
export interface IUserRepository {
    getUserRole(uid: string): Promise<string>;
}