/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetCapabilitiesByRoles($roles: [String!]!) {\n    capabilitiesByRoles(roles: $roles) {\n      op\n      label\n      path\n      roles\n    }\n  }\n": typeof types.GetCapabilitiesByRolesDocument,
    "\n  query GetAllUsers {\n    allUsers {\n      id\n      name\n      email\n      roles\n    }\n  }\n": typeof types.GetAllUsersDocument,
    "\n  query GetUserById($id: ID!) {\n    userById(id: $id) {\n      id\n      name\n      email\n      roles\n    }\n  }\n": typeof types.GetUserByIdDocument,
    "\n  query GetUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      id\n      name\n      email\n      roles\n    }\n  }\n": typeof types.GetUserByEmailDocument,
};
const documents: Documents = {
    "\n  query GetCapabilitiesByRoles($roles: [String!]!) {\n    capabilitiesByRoles(roles: $roles) {\n      op\n      label\n      path\n      roles\n    }\n  }\n": types.GetCapabilitiesByRolesDocument,
    "\n  query GetAllUsers {\n    allUsers {\n      id\n      name\n      email\n      roles\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  query GetUserById($id: ID!) {\n    userById(id: $id) {\n      id\n      name\n      email\n      roles\n    }\n  }\n": types.GetUserByIdDocument,
    "\n  query GetUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      id\n      name\n      email\n      roles\n    }\n  }\n": types.GetUserByEmailDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCapabilitiesByRoles($roles: [String!]!) {\n    capabilitiesByRoles(roles: $roles) {\n      op\n      label\n      path\n      roles\n    }\n  }\n"): (typeof documents)["\n  query GetCapabilitiesByRoles($roles: [String!]!) {\n    capabilitiesByRoles(roles: $roles) {\n      op\n      label\n      path\n      roles\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllUsers {\n    allUsers {\n      id\n      name\n      email\n      roles\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsers {\n    allUsers {\n      id\n      name\n      email\n      roles\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserById($id: ID!) {\n    userById(id: $id) {\n      id\n      name\n      email\n      roles\n    }\n  }\n"): (typeof documents)["\n  query GetUserById($id: ID!) {\n    userById(id: $id) {\n      id\n      name\n      email\n      roles\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      id\n      name\n      email\n      roles\n    }\n  }\n"): (typeof documents)["\n  query GetUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      id\n      name\n      email\n      roles\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;