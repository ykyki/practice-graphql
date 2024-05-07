import { GraphQLScalarType, Kind } from "graphql";
import { MutationKey } from "@src/domain/mutation/MutationKey";

export const MutationKeyScalar = new GraphQLScalarType({
    name: "MutationKey",

    description: "Mutation key",

    serialize(value: unknown): string {
        if (value instanceof MutationKey) {
            return value.toString();
        }
        throw new Error("MutationKey must be a MutationKey instance");
    },

    parseValue(value: unknown): MutationKey {
        if (typeof value !== "string") {
            throw new Error("MutationKey must be a string");
        }
        return MutationKey.parse(value);
    },

    parseLiteral(ast): MutationKey {
        if (ast.kind !== Kind.STRING) {
            throw new Error("MutationKey must be a string");
        }
        return MutationKey.parse(ast.value);
    },
});

export default {
    MutationKey: MutationKeyScalar,
};
