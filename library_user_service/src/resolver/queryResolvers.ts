import type { LibraryUserId } from "@src/domain/library/user/LibraryUserId";
import libraryUserRepository from "@src/domain/library/user/LibraryUserRepository";
import mutationRepository from "@src/domain/mutation/MutationRepository";
import type { QueryResolvers } from "@src/generated/server";
import logger from "@src/logger";

const libraryUser: QueryResolvers["libraryUser"] = async (_, args) => {
    const id = args.id as LibraryUserId;
    const user = await libraryUserRepository.findById(id);

    if (user === null) {
        return null;
    }

    return user.toApiValue();
};

const libraryUsers: QueryResolvers["libraryUsers"] = async () => {
    const users = await libraryUserRepository.findAll();

    return users.map((user) => user.toApiValue());
};

const verifyMutationKey: QueryResolvers["verifyMutationKey"] = async (
    _,
    args,
) => {
    return mutationRepository.verifyKey(args.key);
};

export default {
    libraryUser,
    libraryUsers,
    verifyMutationKey,
} satisfies QueryResolvers;
