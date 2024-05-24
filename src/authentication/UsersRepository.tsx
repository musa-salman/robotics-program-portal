import { db } from "../firebase";
import { BaseRepository } from "../repositories/BaseRepository";
import { User } from "./User";

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(db, "users");
    }

    async getUserRole(uid: any): Promise<string> {
        const user = await this.findOne(uid);
        if (user) {
            return user.role;
        } else {
            return "guest";
        }
    }
}