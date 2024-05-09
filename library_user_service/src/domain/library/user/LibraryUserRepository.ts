import {
    type LibraryUserEntity,
    LibraryUserEntityActive,
    LibraryUserEntityInactive,
} from "@src/domain/library/user/LibraryUserEntity";
import { LibraryUserId } from "@src/domain/library/user/LibraryUserId";

interface LibraryUserRepository {
    findById(id: LibraryUserId): Promise<LibraryUserEntity | null>;
    findAll(): Promise<LibraryUserEntity[]>;
    add({
        name,
        email,
    }: {
        name: string;
        email?: string;
    }): Promise<LibraryUserEntity>;
    inactivate(id: LibraryUserId): Promise<boolean>;
}

class LibraryUserRepositoryImpl implements LibraryUserRepository {
    private users: LibraryUserEntity[];

    constructor() {
        this.users = [
            new LibraryUserEntityActive({
                id: LibraryUserId.from(1),
                name: "Alice",
                activatedAt: new Date(),
            }),
            new LibraryUserEntityActive({
                id: LibraryUserId.from(2),
                name: "Bob",
                email: "abc@example.com",
                activatedAt: new Date("2024-05-04T12:34:56"),
            }),
            new LibraryUserEntityInactive({
                id: LibraryUserId.from(3),
                name: "Charlie",
                activatedAt: new Date("2024-03-30T23:45:01"),
                deactivatedAt: new Date("2024-05-08T12:00:00"),
            }),
        ];
    }

    findById(id: LibraryUserId): Promise<LibraryUserEntity | null> {
        const userOption =
            this.users.find((user) => user.id.equals(id)) ?? null;

        return Promise.resolve(userOption);
    }

    findAll(): Promise<LibraryUserEntity[]> {
        return Promise.resolve(this.users);
    }

    add({
        name,
        email,
    }: {
        name: string;
        email?: string | undefined;
    }): Promise<LibraryUserEntity> {
        const id = LibraryUserId.from(this.users.length + 1);
        const user = new LibraryUserEntityActive({
            id,
            name,
            email,
            activatedAt: new Date(),
        });

        this.users.push(user);

        return Promise.resolve(user);
    }

    inactivate(id: LibraryUserId): Promise<boolean> {
        const index = this.users.findIndex((user) => user.id.equals(id));
        if (index === -1) {
            return Promise.resolve(false);
        }

        const user = this.users[index];
        if (user.isInactive()) {
            return Promise.resolve(false);
        }

        const deactivatedAt = new Date();
        const inactiveUser = user.inactivate(deactivatedAt);

        this.users[index] = inactiveUser;

        return Promise.resolve(true);
    }
}

const libraryUserRepository: LibraryUserRepository =
    new LibraryUserRepositoryImpl();
export default libraryUserRepository;
