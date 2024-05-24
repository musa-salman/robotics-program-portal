
export class User {
    private readonly role: string;

    // Ertugrul
    constructor(role: string) {
        this.role = role;
    }

    getRole(): string {
        return this.role;
    }
}