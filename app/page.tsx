import { PageShell } from "@/components/layout/PageShell";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { computeKpis } from "@/lib/kpi";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Get latest dataset - don't show errors on homepage
  let latestDataset: Awaited<ReturnType<typeof prisma.dataset.findFirst>> & { fieldMappings: any[] } | null = null;
  let kpis: { totalEmissions?: number; totalEmployees?: number; governancePoints?: number } = {};
  
  try {
    latestDataset = await prisma.dataset.findFirst({
      orderBy: { createdAt: "desc" },
      include: { fieldMappings: true },
    });

    if (latestDataset) {
      kpis = await computeKpis(latestDataset.id);
    }
  } catch (error) {
    // Silently fail on homepage - don't show errors until user tries to use features
    console.error("Database error:", error);
  }

  const hasData = latestDataset !== null;

  return (
    <PageShell>
      <div className="space-y-8">
        {/* Header with Value Proposition */}
        <div className="flex items-start justify-between mb-8">
          <div className="fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-teal-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <div className="badge-success">Live</div>
            </div>
            <p className="text-teal-700 text-lg font-semibold mb-2">
              Transform ESG data into compliant CSRD reports in minutes
            </p>
            <p className="text-gray-600 max-w-2xl">
              Advanced ESRS mapping engine with automated compliance checking and professional report generation
            </p>
          </div>
          {hasData && (
            <div className="card p-4 text-right slide-in">
              <div className="status-indicator justify-end mb-2">
                <span className="text-xs text-gray-500">Latest Dataset</span>
                <div className="status-dot success"></div>
              </div>
              <p className="text-sm text-gray-900 font-semibold">{latestDataset?.name || "Untitled Dataset"}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(latestDataset?.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Data Story - KPIs */}
        {hasData ? (
          <>
            <div className="card-premium p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Key Performance Metrics</h2>
                  <p className="text-sm text-gray-600">Real-time ESRS compliance indicators</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="badge-success">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Validated
                  </div>
                  <span className="text-xs text-gray-500">Updated {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
              <KpiCards kpis={kpis} />
            </div>

            {/* Data Insights */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Data Coverage Analysis</h3>
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-100">
                    <div className="flex items-center space-x-3">
                      <div className="status-dot success"></div>
                      <span className="text-sm font-medium text-gray-700">Mapped Fields</span>
                    </div>
                    <span className="text-lg font-bold text-teal-700">{latestDataset?.fieldMappings?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="status-dot info"></div>
                      <span className="text-sm font-medium text-gray-700">Total Columns</span>
                    </div>
                    <span className="text-lg font-bold text-gray-700">
                      {latestDataset?.columns ? (latestDataset.columns as any[]).length : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <div className="flex items-center space-x-3">
                      <div className="status-dot info"></div>
                      <span className="text-sm font-medium text-gray-700">ESRS Sections</span>
                    </div>
                    <div className="flex space-x-1">
                      <span className="badge-info">E1</span>
                      <span className="badge-info">S1</span>
                      <span className="badge-info">G1</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <SectionCard
                    title="Upload Data"
                    description="Import CSV/Excel files"
                    href="/upload"
                  />
                  <SectionCard
                    title="Map to ESRS"
                    description="Auto-suggest field mapping"
                    href="/mappings"
                  />
                  <SectionCard
                    title="Generate Reports"
                    description="Export PDF, HTML, XBRL"
                    href="/reports"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="card-premium p-12">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to Green Ledger
                </h2>
                <p className="text-xl text-teal-700 font-semibold mb-4">
                  Transform ESG data into compliant CSRD reports in minutes
                </p>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Our advanced ESRS mapping engine automatically suggests field mappings and generates professional compliance reports with automated validation.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-100 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="text-teal-700 text-lg font-bold mb-2">1. Upload</div>
                  <div className="text-sm text-gray-600 mb-2">Import CSV/Excel files</div>
                  <div className="text-xs text-teal-600 font-medium">Supports multiple formats</div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div className="text-blue-700 text-lg font-bold mb-2">2. Map</div>
                  <div className="text-sm text-gray-600 mb-2">Auto-suggest ESRS fields</div>
                  <div className="text-xs text-blue-600 font-medium">AI-powered mapping</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-purple-700 text-lg font-bold mb-2">3. Export</div>
                  <div className="text-sm text-gray-600 mb-2">Professional reports</div>
                  <div className="text-xs text-purple-600 font-medium">PDF, HTML, XBRL</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="/upload"
                  className="btn-primary group"
                >
                  Upload Your First Dataset
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                
                <a
                  href="#"
                  className="btn-secondary group"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View Demo
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}

