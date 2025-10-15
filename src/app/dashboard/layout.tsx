'use client';
import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from '@headlessui/react';
import { logout } from '../authService';

type Props = {
  children: React.ReactNode;
};

function handleLogout() {
  logout().then(() => {
    // Redirect to login page or perform other actions after logout
    window.location.href = '/';
  });
}

export default function DashboardLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav = [
    { name: 'Overview', href: '/dashboard', current: true },
    { name: 'Projects', href: '/dashboard/projects', current: false },
    { name: 'Team', href: '/dashboard/team', current: false },
    { name: 'Settings', href: '/dashboard/settings', current: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      {/* Mobile sidebar (Dialog) */}
      <Transition show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="relative z-50 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative w-72 h-full bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xl ring-1 ring-slate-900/5">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                  <DialogTitle className="text-lg font-semibold leading-6">
                    Dashboard
                  </DialogTitle>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar"
                    className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    <svg
                      className="w-5 h-5 text-slate-700 dark:text-slate-200"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10 3.636 5.05 5.05 3.636 10 8.586z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <nav className="px-2 py-4 space-y-1">
                  {nav.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                        item.current
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-600/20 dark:text-indigo-200'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-transparent" />
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto px-4 py-4 border-t border-slate-200 dark:border-slate-700">
                  <Link
                    href="/profile"
                    className="block rounded-md px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    View profile
                  </Link>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden w-72 bg-white border-r border-slate-200 dark:bg-slate-800 dark:border-slate-700 md:block">
          <div className="h-full flex flex-col">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>

            <nav className="flex-1 px-3 py-5 space-y-1 overflow-auto">
              {nav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    item.current
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-600/20 dark:text-indigo-200'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-transparent" />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-700">
              <Link
                href="/profile"
                className="block rounded-md px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                View profile
              </Link>
            </div>
          </div>
        </aside>

        {/* Main area */}
        <div className="flex-1 min-h-screen">
          <header className="sticky top-0 z-20 bg-white border-b border-slate-200 dark:bg-slate-800 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14">
                <div className="flex items-center gap-3">
                  {/* Mobile menu button */}
                  <button
                    type="button"
                    className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open sidebar"
                  >
                    <svg
                      className="w-6 h-6 text-slate-700 dark:text-slate-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>

                  <div className="hidden sm:block">
                    <span className="text-lg font-medium">Welcome</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:block">
                    <input
                      type="search"
                      placeholder="Search"
                      className="w-64 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm placeholder-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                  </div>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
                    <MenuButton className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                      <span className="sr-only">Open profile menu</span>
                      <span className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">
                        U
                      </span>
                      <span className="hidden sm:inline text-sm">User</span>
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
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={`block px-4 py-2 text-sm transition-colors duration-150 ${
                                active ? 'bg-slate-100 dark:bg-slate-700' : ''
                              }`}
                            >
                              Your Profile
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              href="/settings"
                              className={`block px-4 py-2 text-sm transition-colors duration-150 ${
                                active ? 'bg-slate-100 dark:bg-slate-700' : ''
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
                </div>
              </div>
            </div>
          </header>

          <main className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
