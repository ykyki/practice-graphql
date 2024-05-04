import libraryUserRepository from "@src/domain/library/user/LibraryUserRepository";
import type { LibraryUser, QueryResolvers } from "@src/generated/server";

const dummyLibraryUsers: LibraryUser[] = [
    {
        id: "1",
        name: "Alice",
    },
    {
        id: "2",
        name: "Bob",
        email: "abc@example.com",
    },
];

const greeting: QueryResolvers["greeting"] = () => "Hello, world!";
const libraryUser: QueryResolvers["libraryUser"] = (_, args) => {
    return libraryUserRepository.findById(args.id);
};
const libraryUsers: QueryResolvers["libraryUsers"] = () => {
    return libraryUserRepository.findAll();
};

export default {
    greeting,
    libraryUser,
    libraryUsers,
} satisfies QueryResolvers;
