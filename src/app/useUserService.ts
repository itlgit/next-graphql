import { useLazyQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import {
  GetUserByEmailQuery,
  GetUserByIdQuery,
  User,
} from './gql/graphql';

const GET_ALL_USERS = gql`
  query GetAllUsers {
    allUsers {
      id
      name
      email
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    userById(id: $id) {
      id
      name
      email
    }
  }
`;

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      name
      email
    }
  }
`;

export default () => {
  const [queryAll] = useLazyQuery<{ allUsers: User[] }>(GET_ALL_USERS);
  const [queryById] = useLazyQuery<GetUserByIdQuery>(GET_USER_BY_ID);
  const [queryByEmail] = useLazyQuery<GetUserByEmailQuery>(GET_USER_BY_EMAIL);

  const getAllUsers = async (): Promise<User[]> => {
    const result = await queryAll();
    return result.data?.allUsers || [];
  };

  const getUserById = async (id: string): Promise<User | null | undefined> => {
    const result = await queryById({ variables: { id } });
    return result.data?.userById;
  };

  const getUserByEmail = async (
    email: string
  ): Promise<User | null | undefined> => {
    const result = await queryByEmail({ variables: { email } });
    return result.data?.userByEmail;
  };

  return {
    getAllUsers,
    getUserById,
    getUserByEmail,
  };
};
