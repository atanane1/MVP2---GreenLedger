import { PageShell } from "@/components/layout/PageShell";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { computeKpis } from "@/lib/kpi";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Get latest dataset
  let latestDataset = null;
  let kpis = {};
  
  try {
    latestDataset = await prisma.dataset.findFirst({
      orderBy: { createdAt: "desc" },
      include: { fieldMappings: true },
    });

    if (latestDataset) {
      kpis = await computeKpis(latestDataset.id);
    }
  } catch (error) {
    console.error("Database error:", error);
    // Continue with empty state if database error
  }

  return (
    <PageShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Green Ledger – CSRD / ESRS Dashboard
          </h1>
          <p className="text-gray-600">
            Upload your ESG data, map it to ESRS taxonomy, and generate compliant CSRD reports.
          </p>
        </div>

        <KpiCards kpis={kpis} />

        {!latestDataset && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">
              No dataset found. Start by uploading your data to begin generating CSRD reports.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SectionCard
            title="Upload Data"
            description="Upload Excel or CSV files containing your portfolio, ESG KPIs, emissions, and workforce data."
            href="/upload"
          />
          <SectionCard
            title="Map to ESRS"
            description="Automatically map your data fields to ESRS taxonomy codes for CSRD compliance."
            href="/mappings"
          />
          <SectionCard
            title="Build CSRD Report"
            description="Generate, edit, and export your CSRD report in HTML, PDF, or XBRL format."
            href="/reports"
          />
        </div>
      </div>
    </PageShell>
  );
}

