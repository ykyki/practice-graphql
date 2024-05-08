import type { LibraryUserId } from "@src/domain/library/user/LibraryUserId";
import type { LibraryUserStatus } from "@src/domain/library/user/LibraryUserStatus";
import type {
    LibraryUser,
    LibraryUserActive,
    LibraryUserInactive,
} from "@src/generated/server";

export type LibraryUserEntity =
    | LibraryUserEntityActive
    | LibraryUserEntityInactive;

interface IsLibraryUserEntity {
    id: LibraryUserId;
    status: LibraryUserStatus;
    name: string;
    email?: string;
    toApiValue(): LibraryUser;
    IsActive(): this is LibraryUserEntityActive;
    IsInactive(): this is LibraryUserEntityInactive;
}

export class LibraryUserEntityActive implements IsLibraryUserEntity {
    id: LibraryUserId;
    status: LibraryUserStatus = "ACTIVE";
    name: string;
    email?: string;
    activatedAt: Date;

    constructor({
        id,
        name,
        email,
        activatedAt,
    }: {
        id: LibraryUserId;
        name: string;
        email?: string;
        activatedAt: Date;
    }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.activatedAt = activatedAt;
    }
    IsActive(): this is LibraryUserEntityActive {
        return true;
    }
    IsInactive(): this is LibraryUserEntityInactive {
        return false;
    }

    toApiValue(): LibraryUserActive {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            status: this.status,
            activatedAt: this.activatedAt.toISOString(),
        };
    }

    inactivate(inactivatedAt: Date): LibraryUserEntityInactive {
        return new LibraryUserEntityInactive({
            id: this.id,
            name: this.name,
            email: this.email,
            activatedAt: this.activatedAt,
            deactivatedAt: inactivatedAt,
        });
    }
}

export class LibraryUserEntityInactive implements IsLibraryUserEntity {
    id: LibraryUserId;
    status: LibraryUserStatus = "INACTIVE";
    name: string;
    email?: string;
    activatedAt: Date;
    inactivatedAt: Date;

    constructor({
        id,
        name,
        email,
        activatedAt,
        deactivatedAt,
    }: {
        id: LibraryUserId;
        name: string;
        email?: string;
        activatedAt: Date;
        deactivatedAt: Date;
    }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.activatedAt = activatedAt;
        this.inactivatedAt = deactivatedAt;
    }

    IsActive(): this is LibraryUserEntityActive {
        return false;
    }
    IsInactive(): this is LibraryUserEntityInactive {
        return true;
    }

    toApiValue(): LibraryUserInactive {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            status: this.status,
            activatedAt: this.activatedAt.toISOString(),
            inactivatedAt: this.inactivatedAt.toISOString(),
        };
    }
}
