import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { DesktopSidebar, MobileSidebar } from '../sidebar';
import { SessionProvider } from 'next-auth/react';
import { MockedProvider } from '@apollo/client/testing/react';
import { GET_CAPABILITIES_BY_ROLES } from '@/hooks/useCapabilities';
import path from 'path';

function renderEnv(children: React.ReactNode) {
  return render(
    <SessionProvider>
      <MockedProvider mocks={mocks}>{children}</MockedProvider>
    </SessionProvider>
  );
}

const mocks = [
  {
    request: {
      query: GET_CAPABILITIES_BY_ROLES,
      variables: { roles: ['user'] },
    },
    result: {
      data: {
        capabilitiesByRoles: [
          {
            op: 'calendar',
            label: 'Calendar',
            path: '/calendar',
            roles: ['user'],
          },
        ],
      },
    },
  },
];

describe('Sidebar Component', () => {
  it('renders DesktopSidebar correctly', () => {
    const caps = [
      {
        op: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        roles: ['user'],
      }];
    renderEnv(<DesktopSidebar capabilities={caps}/>);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
  it('renders MobileSidebar correctly when open', () => {
    const caps = [
      {
        op: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        roles: ['user'],
      }];
    renderEnv(<MobileSidebar capabilities={caps} open={true} onClose={() => {}} />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
