export class MutationKey {
    private static PREFIX = "mk_";
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    toString(): string {
        return this.value;
    }

    static generateFrom(value: string): MutationKey {
        const v = `${MutationKey.PREFIX}${value}`;
        return new MutationKey(v);
    }

    static match(value: string): boolean {
        return value.startsWith(MutationKey.PREFIX);
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
