import { useLazyQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

export const useUserService = () => {
  const [userQuery, { data, loading, error }] = useLazyQuery(GET_USER);

  const getUser = (id: string) => {
    return userQuery({ variables: { id } });
  };

  return {
    getUser,
  };
};
