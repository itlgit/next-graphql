import { useLazyQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import type { Capability } from '../data/capabilities';

const GET_CAPABILITIES_BY_ROLES = gql`
  query GetCapabilitiesByRoles($roles: [String!]!) {
    capabilitiesByRoles(roles: $roles) {
      op
      label
      path
      roles
    }
  }
`;

export default () => {
  const [queryCapabilities] = useLazyQuery<{
    capabilitiesByRoles: Capability[];
  }>(GET_CAPABILITIES_BY_ROLES);

  const getCapabilitiesByRoles = async (roles: string[]) => {
    const result = await queryCapabilities({ variables: { roles } });
    return result.data?.capabilitiesByRoles || [];
  };

  return { getCapabilitiesByRoles };
};
