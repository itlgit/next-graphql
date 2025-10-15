
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/app/gql/schema.graphql",
  documents: "src/app/**/*.+(ts|tsx)",
  generates: {
    "src/app/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
