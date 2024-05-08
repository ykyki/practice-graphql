import libraryUserRepository from "@src/domain/library/user/LibraryUserRepository";
import mutationRepository from "@src/domain/mutation/MutationRepository";
import type { LibraryUser, QueryResolvers } from "@src/generated/server";

const libraryUser: QueryResolvers["libraryUser"] = (_, args) => {
    return libraryUserRepository.findById(args.id);
};

const libraryUsers: QueryResolvers["libraryUsers"] = () => {
    return libraryUserRepository.findAll();
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
