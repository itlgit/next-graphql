import { join } from 'node:path';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import * as Users from '../../data/users';
import * as Capabilities from '../../data/capabilities';

const resolvers = {
  Query: {
    // users
    userById: (_: any, { id }: { id: string }) => Users.getUserById(id),
    userByEmail: (_: any, { email }: { email: string }) =>
      Users.getUserByEmail(email),
    allUsers: () => Users.getAllUsers(),
    // capabilities
    capabilitiesByRoles: (_: any, { roles }: { roles: string[] }) => {
      return Capabilities.getCapabilitiesByRoles(roles);
    },
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
