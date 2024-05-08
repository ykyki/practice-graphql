import type { IsApiValue } from "@src/domain/common/IsApiValue";

export class MutationKey implements IsApiValue {
    private static PREFIX = "muk_";
    private static regex = new RegExp(`^${MutationKey.PREFIX}\\w+$`);
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    getApiValue(): string {
        return this.value;
    }

    static from(value: string): MutationKey {
        if (value.length === 0) {
            throw new Error("MutationKey must not be empty");
        }

        const v = `${MutationKey.PREFIX}${value}`;

        return new MutationKey(v);
    }

    static match(value: string): boolean {
        return MutationKey.regex.test(value);
    }

    static parse(value: string): MutationKey {
        if (!MutationKey.match(value)) {
            throw new Error(
                `value does not match MutationKey format (${value})`,
            );
        }

        return new MutationKey(value);
    }
}
