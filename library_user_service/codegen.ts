import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "./graphql",
    generates: {
        "src/generated/server.ts": {
            plugins: ["typescript", "typescript-resolvers"],
        },
    },
};

export default config;
