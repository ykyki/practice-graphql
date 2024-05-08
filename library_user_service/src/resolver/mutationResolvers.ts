import type { LibraryUserId } from "@src/domain/library/user/LibraryUserId";
import libraryUserRepository from "@src/domain/library/user/LibraryUserRepository";
import mutationRepository from "@src/domain/mutation/MutationRepository";
import type { MutationResolvers } from "@src/generated/server";

const addLibraryUser: MutationResolvers["addLibraryUser"] = async (_, args) => {
    const user = await libraryUserRepository.add({
        name: args.input.name,
        email: args.input.email ?? undefined,
    });

    return user.toApiValue();
};

const deleteLibraryUser: MutationResolvers["deleteLibraryUser"] = async (
    _,
    args,
) => {
    const id = args.id as LibraryUserId;
    const result = await libraryUserRepository.delete(id);

    return result;
};

const createMutationKey: MutationResolvers["createMutationKey"] = async () => {
    const key = await mutationRepository.createKey();

    return key;
};

export default {
    addLibraryUser,
    deleteLibraryUser,
    createMutationKey,
} satisfies MutationResolvers;
