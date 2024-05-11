import {
    type LibraryUserEntity,
    LibraryUserEntityActive,
    LibraryUserEntityInactive,
} from "@src/domain/library/user/LibraryUserEntity";
import { LibraryUserId } from "@src/domain/library/user/LibraryUserId";
import {
    type SelectUserByIdRow,
    deleteUserActiveState,
    insertUserActiveEvent,
    insertUserActiveState,
    insertUserInactiveEvent,
    insertUserInactiveState,
    selectUserById,
    selectUsers,
} from "@src/generated/sqlc/library_user_query_sql";
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
    // constructor() {}

    async findById(id: LibraryUserId): Promise<LibraryUserEntity | null> {
        const client = await postgresDb.pool.connect();
        const result = await selectUserById(client, {
            substring: id.toApiValue(),
        });
        client.release();

        if (result === null) {
            return null;
        }
        return LibraryUserRepositoryImpl.fromDbValueToEntity(result);
    }

    async findAll(): Promise<LibraryUserEntity[]> {
        const client = await postgresDb.pool.connect();
        const result = await selectUsers(client);
        client.release();

        const entities = result.map((v) =>
            LibraryUserRepositoryImpl.fromDbValueToEntity(v),
        );

        return entities;
    }

    async add({
        name,
        email,
    }: {
        name: string;
        email?: string | undefined;
    }): Promise<LibraryUserEntity> {
        const client = await postgresDb.pool.connect();
        const id = LibraryUserId.from(Math.floor(Math.random() * 100000) + 1); // TODO: use sequence
        const now = new Date();
        const user = new LibraryUserEntityActive({
            id,
            name,
            email,
            activatedAt: now,
        });
        await insertUserActiveEvent(client, {
            substring: user.id.toApiValue(), // TODO: use toDbValue
            name: user.name,
            email: user.email ?? null,
            activatedTime: user.activatedAt,
            eventTime: now,
        });
        const result = await insertUserActiveState(client, {
            substring: user.id.toApiValue(), // TODO: use toDbValue
            name: user.name,
            email: user.email ?? null,
            activatedTime: user.activatedAt,
        });
        client.release();

        return LibraryUserRepositoryImpl.fromDbValueToEntity(result!); // TODO: handle null
    }

    async inactivate(id: LibraryUserId): Promise<boolean> {
        const client = await postgresDb.pool.connect();

        const result = await selectUserById(client, {
            substring: id.toApiValue(),
        });
        if (result === null) {
            client.release();
            return false;
        }
        const user = LibraryUserRepositoryImpl.fromDbValueToEntity(result);
        if (!user.isActive()) {
            client.release();
            return false;
        }

        try {
            await client.query("BEGIN");
            const now = new Date();
            const userInactive = user.inactivate(now);
            await insertUserInactiveEvent(client, {
                substring: userInactive.id.toApiValue(),
                inactivatedTime: userInactive.inactivatedAt,
                eventTime: now,
            });
            await deleteUserActiveState(client, {
                substring: id.toApiValue(),
            });
            const _result2 = await insertUserInactiveState(client, {
                substring: id.toApiValue(),
                name: userInactive.name,
                email: userInactive.email ?? null,
                activatedTime: userInactive.activatedAt,
                inactivatedTime: userInactive.inactivatedAt,
            });
            await client.query("COMMIT");
        } catch (e) {
            await client.query("ROLLBACK");
            throw e;
        } finally {
            client.release();
        }

        return true;
    }

    private static fromDbValueToEntity(
        v: SelectUserByIdRow,
    ): LibraryUserEntity {
        const status = LibraryUserStatus.fromDbValue(v.status);
        switch (status) {
            case LibraryUserStatus.ACTIVE:
                return new LibraryUserEntityActive({
                    id: LibraryUserId.fromDbValue(v.libraryUserId),
                    name: v.name,
                    email: v.email ?? undefined,
                    activatedAt: v.activatedTime,
                });
            case LibraryUserStatus.INACTIVE:
                return new LibraryUserEntityInactive({
                    id: LibraryUserId.fromDbValue(v.libraryUserId),
                    name: v.name,
                    email: v.email ?? undefined,
                    activatedAt: v.activatedTime,
                    // biome-ignore lint/style/noNonNullAssertion: inactivatedAt is not null for INACTIVE status
                    inactivatedAt: v.inactivatedTime!,
                });
            default:
                throw new Error(`Invalid LibraryUserStatus: ${status}`);
        }
    }
}

const libraryUserRepository: LibraryUserRepository =
    new LibraryUserRepositoryImpl();
export default libraryUserRepository;
