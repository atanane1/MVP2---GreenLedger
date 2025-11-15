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
      <div className="space-y-6">
        {/* Header with Value Proposition */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-green-500 text-sm font-medium">
              Transform ESG data into compliant CSRD reports in minutes
            </p>
          </div>
          {hasData && (
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Latest Dataset</p>
              <p className="text-sm text-white font-medium">{latestDataset?.name || "Untitled"}</p>
            </div>
          )}
        </div>

        {/* Data Story - KPIs */}
        {hasData ? (
          <>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Key Metrics</h2>
                <span className="text-xs text-gray-600">ESRS Compliance</span>
              </div>
              <KpiCards kpis={kpis} />
            </div>

            {/* Data Insights */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Data Coverage</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Mapped Fields</span>
                    <span className="text-sm font-semibold text-white">{latestDataset?.fieldMappings?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Total Columns</span>
                    <span className="text-sm font-semibold text-white">
                      {latestDataset?.columns ? (latestDataset.columns as any[]).length : 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Report Sections</span>
                    <span className="text-sm font-semibold text-white">E1, S1, G1</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Quick Actions</h3>
                <div className="grid grid-cols-3 gap-2">
                  <SectionCard
                    title="Upload"
                    description="Add data"
                    href="/upload"
                  />
                  <SectionCard
                    title="Map"
                    description="ESRS fields"
                    href="/mappings"
                  />
                  <SectionCard
                    title="Reports"
                    description="View & export"
                    href="/reports"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="text-center">
              <p className="text-green-500 text-lg font-semibold mb-2">
                Transform ESG data into compliant CSRD reports in minutes
              </p>
              <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
                Upload your data, map to ESRS taxonomy, and generate professional reports with E1, S1, G1 sections.
              </p>
              <div className="grid md:grid-cols-3 gap-3 mb-6">
                <div className="bg-gray-800 rounded p-3">
                  <div className="text-green-500 text-xs font-semibold mb-1">1. Upload</div>
                  <div className="text-xs text-gray-400">CSV/Excel files</div>
                </div>
                <div className="bg-gray-800 rounded p-3">
                  <div className="text-green-500 text-xs font-semibold mb-1">2. Map</div>
                  <div className="text-xs text-gray-400">Auto-suggest ESRS</div>
                </div>
                <div className="bg-gray-800 rounded p-3">
                  <div className="text-green-500 text-xs font-semibold mb-1">3. Export</div>
                  <div className="text-xs text-gray-400">PDF, HTML, XBRL</div>
                </div>
              </div>
              <a
                href="/upload"
                className="inline-flex items-center px-5 py-2.5 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors text-sm"
              >
                Upload Your First Dataset
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}

