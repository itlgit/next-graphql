import caps from './capabilities.json';

export type Capability = { op: string; label: string; path: string; roles: string[] };

function isCapabilityForRoles(cap: Capability, roles: string[]) {
  return cap.roles.some((role) => roles.includes(role) || role === 'all');
}

export function getCapabilitiesByRoles(roles: string[]) {
  return caps.filter((cap) => isCapabilityForRoles(cap, roles));
}
