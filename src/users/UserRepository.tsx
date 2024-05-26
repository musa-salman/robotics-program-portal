import { db } from "../firebase";
import { BaseRepository } from "../repositories/BaseRepository";
import { IUserRepository } from "./IUserRepository";
import { User } from "./User";

export class UserRepository extends BaseRepository<User> implements IUserRepository {
    constructor() {
        super(db, "users");
    }

    async getUserRole(uid: string): Promise<string> {
        const user = await this.findOne(uid);
        if (user) {
            return user.role;
        } else {
            return "guest";
        }
    }
}