import Link from "next/link";

export function TopNav() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
                Green Ledger
              </span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-1">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/upload"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Upload
              </Link>
              <Link
                href="/mappings"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Mappings
              </Link>
              <Link
                href="/reports"
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

