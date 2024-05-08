import type { LibraryUser } from "@src/generated/server";
import { LibraryUserId } from "./LibraryUserId";

const dummyLibraryUsers: LibraryUser[] = [
    {
        id: LibraryUserId.from(1),
        name: "Alice",
    },
    {
        id: LibraryUserId.from(2),
        name: "Bob",
        email: "abc@example.com",
    },
];

class LibraryUserRepository {
    private users: LibraryUser[];

    constructor() {
        this.users = dummyLibraryUsers;
    }

    async findById(id: LibraryUserId): Promise<LibraryUser | null> {
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
        const id = LibraryUserId.from(this.users.length + 1);
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
