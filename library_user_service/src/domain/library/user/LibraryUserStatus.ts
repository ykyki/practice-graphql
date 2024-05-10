import type { HasEquals } from "@src/domain/common/HasEquals";
import type { IsApiValue } from "@src/domain/common/IsApiValue";

export class LibraryUserStatus implements IsApiValue, HasEquals {
    static readonly ACTIVE = new LibraryUserStatus("ACTIVE");
    static readonly INACTIVE = new LibraryUserStatus("INACTIVE");
    private readonly value: "ACTIVE" | "INACTIVE";
    private constructor(value: "ACTIVE" | "INACTIVE") {
        this.value = value;
    }

    equals(other: unknown): boolean {
        if (!(other instanceof LibraryUserStatus)) {
            return false;
        }
        return this.value === other.value;
    }

    toApiValue(): string {
        switch (this.value) {
            case "ACTIVE":
                return "active";
            case "INACTIVE":
                return "inactive";
        }
    }
}
