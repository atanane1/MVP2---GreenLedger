import Link from "next/link";

export function TopNav() {
  return (
    <nav className="glass-effect border-b border-gray-200/50 shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                  <span className="text-white font-bold text-sm">GL</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  Green Ledger
                </span>
                <span className="text-xs text-teal-600 font-medium -mt-1">
                  CSRD Reporting Platform
                </span>
              </div>
            </Link>
            <div className="hidden sm:ml-12 sm:flex lg:hidden sm:space-x-1">
              <Link
                href="/"
                className="nav-link"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
                </svg>
                Dashboard
              </Link>
              <Link
                href="/upload"
                className="nav-link"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload
              </Link>
              <Link
                href="/mappings"
                className="nav-link"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Mappings
              </Link>
              <Link
                href="/reports"
                className="nav-link"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Reports
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-teal-50 rounded-full">
              <div className="status-dot success"></div>
              <span className="text-xs font-medium text-teal-700">System Online</span>
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">U</span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">User</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

