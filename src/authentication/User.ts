
export class User {
    private readonly role: string;

    constructor(role: string) {
        this.role = role;
    }

    getRole(): string {
        return this.role;
    }
}