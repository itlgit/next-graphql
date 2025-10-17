import {
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { Capability } from '../gql/graphql';

interface Nav extends Capability {
  current: boolean;
}

const DASHBOARD_PREFIX = '/dashboard';

function changeCapToNav(capabilities: Capability[]): Nav[] {
  return capabilities.map((cap) => ({
    ...cap,
    path: `${DASHBOARD_PREFIX}${cap.path}`,
    current: window.location.pathname == `${DASHBOARD_PREFIX}${cap.path}`,
  }));
}

type Props = {
  capabilities: Capability[];
};

export const DesktopSidebar = (props: Props) => {
  const nav = React.useMemo<Nav[]>(
    () => changeCapToNav(props.capabilities),
    [props.capabilities]
  );

  return (
    <aside className="hidden w-72 bg-white border-r border-slate-200 dark:bg-slate-800 dark:border-slate-700 md:block">
      <div className="h-full flex flex-col">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-auto">
          {nav.map((item) => (
            <Link
              key={item.op}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                item.current
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-600/20 dark:text-indigo-200'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-transparent" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-700">
          <Link
            href={`${DASHBOARD_PREFIX}/profile`}
            className="block rounded-md px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            View profile
          </Link>
        </div>
      </div>
    </aside>
  );
};

interface MobileProps extends Props {
  open: boolean;
  onClose: () => void;
}
export const MobileSidebar = (props: MobileProps) => {
  const nav = React.useMemo<Nav[]>(
    () => changeCapToNav(props.capabilities),
    [props.capabilities]
  );
  return (
    <Transition show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 md:hidden"
        onClose={props.onClose}
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
                  onClick={() => props.onClose()}
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
                    key={item.op}
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      item.current
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-600/20 dark:text-indigo-200'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                    onClick={() => props.onClose()}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-transparent" />
                    {item.label}
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
  );
};
