import { join } from 'node:path';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import * as Users from '../users';

const resolvers = {
  Query: {
    userById: (_: any, { id }: { id: string }) => Users.getUserById(id),
    userByEmail: (_: any, { email }: { email: string }) =>
      Users.getUserByEmail(email),
    allUsers: () => Users.getAllUsers(),
  },
};

const schema = loadSchemaSync(
  join(process.cwd(), 'src/app/gql/schema.graphql'),
  {
    loaders: [new GraphQLFileLoader()],
  }
);

export const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

export default schemaWithResolvers;
