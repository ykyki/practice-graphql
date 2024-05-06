import mutationRepository from "@src/MutationRepository";
import libraryUserRepository from "@src/domain/library/user/LibraryUserRepository";
import type { MutationResolvers } from "@src/generated/server";

const addLibraryUser: MutationResolvers["addLibraryUser"] = (_, args) => {
    return libraryUserRepository.add({
        name: args.input.name,
        email: args.input.email ?? undefined,
    });
};

const deleteLibraryUser: MutationResolvers["deleteLibraryUser"] = (_, args) => {
    return libraryUserRepository.delete(args.id);
};

const createMutationKey: MutationResolvers["createMutationKey"] = async () => {
    const key = await mutationRepository.createKey();

    return {
        value: key,
    };
};

export default {
    addLibraryUser,
    deleteLibraryUser,
    createMutationKey,
} satisfies MutationResolvers;