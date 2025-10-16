
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/app/gql/schema.graphql",
  documents: "src/hooks/*.+(ts|tsx)",
  generates: {
    "src/app/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
