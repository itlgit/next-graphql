import React from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import { logout } from '../authService';
import { useSession } from 'next-auth/react';

function handleLogout() {
  logout().then(() => {
    // Redirect to login page or perform other actions after logout
    window.location.href = '/';
  });
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function ProfileDropdown() {
  const { data: session, status} = useSession();
  const userName = session?.user?.name || '';

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
        <span className="sr-only">Open profile menu</span>
        <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">
          {getInitials(userName || '')}
        </span>
        <span className="hidden sm:inline text-sm">{userName}</span>
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg focus:outline-none py-1">
          <MenuItem>
            {({ focus }) => (
              <Link
                href="/profile"
                className={`block px-4 py-2 text-sm transition-colors duration-150 ${
                  focus ? 'bg-slate-100 dark:bg-slate-700' : ''
                }`}
              >
                Your Profile
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <Link
                href="/settings"
                className={`block px-4 py-2 text-sm transition-colors duration-150 ${
                  focus ? 'bg-slate-100 dark:bg-slate-700' : ''
                }`}
              >
                Settings
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={handleLogout}
                className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                  focus ? 'bg-slate-100 dark:bg-slate-700' : ''
                }`}
              >
                Sign out
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
