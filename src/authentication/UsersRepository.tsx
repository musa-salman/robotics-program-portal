import { db } from "../firebase";
import { BaseRepository } from "../repositories/BaseRepository";
import { User } from "./User";

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(db, "users");
    }

    getUserRole(uid: any): Promise<string> {
        return this.findOne(uid).then((user) => {
            if (user) {
                return user.getRole();
            } else {
                return "guest";
            }
        });
    }
}