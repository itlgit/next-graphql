import React from 'react';
import ProfileDropdown from './profile-dropdown';
import { MobileSidebar, DesktopSidebar } from './sidebar';
import useCapabilities from '@/hooks/useCapabilities';
import { useSession } from 'next-auth/react';
import { Capability } from '@/data/capabilities';
import { User } from '../gql/graphql';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { getCapabilitiesByRoles } = useCapabilities();
  const session = useSession();
  const user = session.data?.user as User;
  const [caps, setCaps] = React.useState<Capability[]>([]);
  React.useEffect(() => {
    if (user) {
      getCapabilitiesByRoles(user.roles).then(setCaps);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <MobileSidebar capabilities={caps} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex">
        <DesktopSidebar capabilities={caps} />

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

                  <ProfileDropdown />
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
