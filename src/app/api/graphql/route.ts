import { createYoga } from 'graphql-yoga';
import schemaWithResolvers from '@/app/gql/schema';

const { handleRequest } = createYoga({
  schema: schemaWithResolvers,
  graphqlEndpoint: '/api/graphql',
});

export { handleRequest as GET, handleRequest as POST };
