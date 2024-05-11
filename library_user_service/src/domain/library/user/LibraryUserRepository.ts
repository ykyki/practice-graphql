import {
    type LibraryUserEntity,
    LibraryUserEntityActive,
    LibraryUserEntityInactive,
} from "@src/domain/library/user/LibraryUserEntity";
import { LibraryUserId } from "@src/domain/library/user/LibraryUserId";
import {
    type LibraryUserRepositoryDb_findByAllRow,
    type LibraryUserRepositoryDb_findByIdRow,
    libraryUserRepositoryDb_findByAll,
    libraryUserRepositoryDb_findById,
} from "@src/generated/sqlc/query_sql";
import logger from "@src/logger";
import { postgresDb } from "@src/postgres";
import { LibraryUserStatus } from "./LibraryUserStatus";

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
                inactivatedAt: new Date("2024-05-08T12:00:00"),
            }),
        ];
    }

    async findById(id: LibraryUserId): Promise<LibraryUserEntity | null> {
        const client = await postgresDb.pool.connect();
        const result = await libraryUserRepositoryDb_findById(client, {
            substring: id.toApiValue(),
        });
        client.release();
        logger.info(`findById: ${JSON.stringify(result)}`);

        if (result === null) {
            return null;
        }
        return LibraryUserRepositoryImpl.fromDbValueToEntity(result);
    }

    async findAll(): Promise<LibraryUserEntity[]> {
        const client = await postgresDb.pool.connect();
        const result = await libraryUserRepositoryDb_findByAll(client);
        client.release();

        const entities = result.map((v) =>
            LibraryUserRepositoryImpl.fromDbValueToEntity(v),
        );

        return entities;
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

    private static fromDbValueToEntity(
        v:
            | LibraryUserRepositoryDb_findByAllRow
            | LibraryUserRepositoryDb_findByIdRow,
    ): LibraryUserEntity {
        const status = LibraryUserStatus.fromDbValue(v.status);
        switch (status) {
            case LibraryUserStatus.ACTIVE:
                return new LibraryUserEntityActive({
                    id: LibraryUserId.fromDbValue(v.libraryUserId!), // v.id should not be null
                    name: v.name,
                    email: v.email ?? undefined,
                    activatedAt: v.activatedTime,
                });
            case LibraryUserStatus.INACTIVE:
                return new LibraryUserEntityInactive({
                    id: LibraryUserId.fromDbValue(v.libraryUserId!), // v.id should not be null
                    name: v.name,
                    email: v.email ?? undefined,
                    activatedAt: v.activatedTime,
                    inactivatedAt: v.inactivatedTime!, // v.inactivatedTime should be non-null Date
                });
            default:
                throw new Error(`Invalid LibraryUserStatus: ${status}`);
        }
    }
}

const libraryUserRepository: LibraryUserRepository =
    new LibraryUserRepositoryImpl();
export default libraryUserRepository;
