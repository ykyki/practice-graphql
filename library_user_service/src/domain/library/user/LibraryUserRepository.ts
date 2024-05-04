import type { LibraryUser } from "@src/generated/server";

const dummyLibraryUsers: LibraryUser[] = [
    {
        id: "1",
        name: "Alice",
    },
    {
        id: "2",
        name: "Bob",
        email: "abc@example.com",
    },
];

class LibraryUserRepository {
    private users: LibraryUser[];

    constructor() {
        this.users = dummyLibraryUsers;
    }

    async findById(id: string): Promise<LibraryUser | null> {
        return this.users.find((user) => user.id === id) ?? null;
    }

    async findAll(): Promise<LibraryUser[]> {
        return this.users;
    }

    async add({
        name,
        email,
    }: {
        name: string;
        email?: string;
    }): Promise<LibraryUser> {
        const id = String(this.users.length + 1);
        const user = { id, name, email };
        this.users.push(user);
        return user;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return false;
        }
        this.users.splice(index, 1);
        return true;
    }
}

const libraryUserRepository = new LibraryUserRepository();
export default libraryUserRepository;
