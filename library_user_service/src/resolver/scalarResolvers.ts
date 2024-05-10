import { LibraryUserId } from "@src/domain/library/user/LibraryUserId";
import { MutationKey } from "@src/domain/mutation/MutationKey";
import type {
    LibraryUserIdScalarConfig,
    MutationKeyScalarConfig,
} from "@src/generated/server";
import { GraphQLScalarType, Kind } from "graphql";

export const MutationKeyScalar = new GraphQLScalarType({
    name: "MutationKey",

    description: "Mutation key",

    serialize(value: unknown): string {
        if (value instanceof MutationKey) {
            return value.toApiValue();
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
} satisfies MutationKeyScalarConfig);

export const LibraryUserIdScalar = new GraphQLScalarType({
    name: "LibraryUserId",

    description: "Library user ID",

    serialize(value: unknown): string {
        if (value instanceof LibraryUserId) {
            return value.toApiValue();
        }
        throw new Error("LibraryUserId must be a LibraryUserId instance");
    },

    parseValue(value: unknown): LibraryUserId {
        if (typeof value !== "string") {
            throw new Error("LibraryUserId must be a string");
        }
        return LibraryUserId.parse(value);
    },

    parseLiteral(ast): LibraryUserId {
        if (ast.kind !== Kind.STRING) {
            throw new Error("LibraryUserId must be a string");
        }
        return LibraryUserId.parse(ast.value);
    },
} satisfies LibraryUserIdScalarConfig);

export default {
    MutationKey: MutationKeyScalar,
    LibraryUserId: LibraryUserIdScalar,
};
