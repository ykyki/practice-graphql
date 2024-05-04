import libraryUserRepository from "@src/domain/library/user/LibraryUserRepository";
import type { LibraryUser, MutationResolvers } from "@src/generated/server";

const addLibraryUser: MutationResolvers["addLibraryUser"] = (_, args) => {
    return libraryUserRepository.add({
        name: args.input.name,
        email: args.input.email ?? undefined,
    });
};

const deleteLibraryUser: MutationResolvers["deleteLibraryUser"] = (_, args) => {
    return libraryUserRepository.delete(args.id);
};

export default {
    addLibraryUser,
    deleteLibraryUser,
} satisfies MutationResolvers;