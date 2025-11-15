import { PageShell } from "@/components/layout/PageShell";
import { ReportEditor } from "@/components/reports/ReportEditor";
import { prisma } from "@/lib/prisma";
import { buildDefaultSections } from "@/lib/reportTemplate";

export const dynamic = 'force-dynamic';

export default async function ReportsPage() {
  // Get latest dataset with sections
  let dataset: Awaited<ReturnType<typeof prisma.dataset.findFirst>> & { fieldMappings: any[]; reportSections: any[] } | null = null;
  let sections: any[] = [];
  
  try {
    dataset = await prisma.dataset.findFirst({
      orderBy: { createdAt: "desc" },
      include: { fieldMappings: true, reportSections: true },
    });

    sections = dataset?.reportSections || [];

    // Generate default sections if none exist
    if (dataset && sections.length === 0 && dataset.fieldMappings.length > 0) {
      const defaultSections = buildDefaultSections(dataset, dataset.fieldMappings);
      const datasetId = dataset.id; // Extract to satisfy TypeScript
      const createdSections = await Promise.all(
        defaultSections.map((section) =>
          prisma.reportSection.create({
            data: {
              datasetId: datasetId,
              sectionCode: section.sectionCode,
              title: section.title,
              content: section.content,
            },
          })
        )
      );
      sections = createdSections;
    }
  } catch (error) {
    console.error("Database error:", error);
    // Continue with empty state if database error
  }

  return (
    <PageShell breadcrumbs={[{ label: "Home", href: "/" }, { label: "CSRD Reports" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">CSRD Report Editor</h1>
          <p className="text-sm text-gray-400 mb-3">
            Review, edit, and export your CSRD compliance report with E1 (Climate), S1 (Workforce), and G1 (Governance) sections.
          </p>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-3">
            <p className="text-xs text-gray-400">
              <span className="text-green-500 font-semibold">Tip:</span> Use Preview mode to see how your report will look. 
              Switch to Edit mode to make changes. Export to PDF, HTML, or XBRL when ready.
            </p>
          </div>
        </div>

        {!dataset ? (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📄</span>
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">No Data Available</h2>
            <p className="text-sm text-gray-400 mb-4">
              Upload data and map fields to ESRS first, then generate your CSRD report.
            </p>
            <div className="flex justify-center space-x-3">
              <a
                href="/upload"
                className="inline-flex items-center px-5 py-2.5 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors text-sm"
              >
                Upload Data
              </a>
              <a
                href="/mappings"
                className="inline-flex items-center px-5 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors text-sm border border-gray-700"
              >
                Map Fields
              </a>
            </div>
          </div>
        ) : (
          <ReportEditor
            dataset={dataset ? { id: dataset.id } : null}
            sections={sections}
          />
        )}
      </div>
    </PageShell>
  );
}

