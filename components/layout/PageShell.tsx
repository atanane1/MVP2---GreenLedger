import { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { Breadcrumbs } from "./Breadcrumbs";
import { Sidebar } from "./Sidebar";

interface PageShellProps {
  children: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function PageShell({ children, breadcrumbs }: PageShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <TopNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:pl-64">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className="mb-6">
                <Breadcrumbs items={breadcrumbs} />
              </div>
            )}
            <div className="fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

