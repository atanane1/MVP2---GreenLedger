import { PageShell } from "@/components/layout/PageShell";
import { MappingEditor } from "@/components/mappings/MappingEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function MappingsPage() {
  // Get latest dataset with mappings
  let dataset: Awaited<ReturnType<typeof prisma.dataset.findFirst>> & { fieldMappings: any[] } | null = null;
  
  try {
    dataset = await prisma.dataset.findFirst({
      orderBy: { createdAt: "desc" },
      include: { fieldMappings: true },
    });
  } catch (error) {
    console.error("Database error:", error);
    // Continue with null dataset if database error
  }

  return (
    <PageShell breadcrumbs={[{ label: "Home", href: "/" }, { label: "ESRS Mappings" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Map Fields to ESRS Taxonomy</h1>
          <p className="text-sm text-gray-400 mb-3">
            Connect your data columns to ESRS (European Sustainability Reporting Standards) fields for CSRD compliance.
          </p>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-3">
            <p className="text-xs text-gray-400">
              <span className="text-green-500 font-semibold">Auto-suggest:</span> Green Ledger suggests ESRS mappings based on column names. 
              Review and adjust as needed.
            </p>
          </div>
        </div>

        {!dataset ? (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📋</span>
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">No Dataset Found</h2>
            <p className="text-sm text-gray-400 mb-4">
              Upload a dataset first to start mapping fields to ESRS taxonomy.
            </p>
            <a
              href="/upload"
              className="inline-flex items-center px-5 py-2.5 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-400 transition-colors text-sm"
            >
              Upload Dataset
            </a>
          </div>
        ) : (
          <MappingEditor
            dataset={dataset ? { id: dataset.id, columns: dataset.columns as any } : null}
            existingMappings={dataset?.fieldMappings || []}
          />
        )}
      </div>
    </PageShell>
  );
}

