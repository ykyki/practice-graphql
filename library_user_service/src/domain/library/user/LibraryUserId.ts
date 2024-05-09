import type { HasEquals } from "@src/domain/common/HasEquals";
import type { IsApiValue } from "@src/domain/common/IsApiValue";

export class LibraryUserId implements IsApiValue, HasEquals {
    private static PREFIX = "LUI";
    private static regex = new RegExp(`^${LibraryUserId.PREFIX}\\d{5}$`);
    private value: string;

    constructor(value: string) {
        this.value = value;
    }

    toApiValue(): string {
        return this.value;
    }

    static from(i: number): LibraryUserId {
        if (i <= 0) {
            throw new Error("LibraryUserId must be greater than 0");
        }
        if (!Number.isInteger(i)) {
            throw new Error("LibraryUserId must be an integer");
        }

        // ex. 1234 -> LUI01234
        const v = i.toString().padStart(5, "0");
        return new LibraryUserId(`${LibraryUserId.PREFIX}${v}`);
    }

    static match(value: string): boolean {
        return LibraryUserId.regex.test(value);
    }

    static parse(value: string): LibraryUserId {
        if (!LibraryUserId.match(value)) {
            throw new Error(
                `value does not match LibraryUserId format (${value})`,
            );
        }
        return new LibraryUserId(value);
    }

    equals(other: unknown): boolean {
        if (!(other instanceof LibraryUserId)) {
            return false;
        }
        return this.value === other.value;
    }
}
