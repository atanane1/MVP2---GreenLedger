"use client";

import { useState, useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { FileUploadForm } from "@/components/upload/FileUploadForm";
import { DatasetTable } from "@/components/upload/DatasetTable";

export default function UploadPage() {
  const [dataset, setDataset] = useState<any>(null);

  useEffect(() => {
    // Fetch latest dataset on mount
    fetch("/api/mappings")
      .then((res) => res.json())
      .then((data) => {
        if (data.dataset) {
          setDataset(data.dataset);
        }
      })
      .catch((err) => console.error("Failed to fetch dataset:", err));
  }, []);

  const handleUploadSuccess = (newDataset: any) => {
    setDataset(newDataset);
  };

  return (
    <PageShell breadcrumbs={[{ label: "Home", href: "/" }, { label: "Upload dataset" }]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Upload Your ESG Data</h1>
          <p className="text-sm text-gray-400 mb-4">
            Upload CSV or Excel files with your ESG data—emissions, workforce, governance metrics.
          </p>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-3">
            <p className="text-xs text-gray-400">
              <span className="text-green-500 font-semibold">Supported:</span> CSV (.csv), Excel (.xlsx, .xls)
            </p>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-gray-400">Example columns:</span> isin, market_value, co2_emissions, employees
            </p>
          </div>
        </div>

        <FileUploadForm onUploadSuccess={handleUploadSuccess} />

        {dataset && (
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Dataset Preview</h2>
            <DatasetTable dataset={dataset} />
            <div className="mt-4 bg-gray-900 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-500 text-sm font-medium mb-1">✓ Dataset uploaded successfully!</p>
              <p className="text-xs text-gray-400">
                Next: Go to <a href="/mappings" className="text-green-500 underline font-semibold">Mappings</a> to map fields to ESRS taxonomy.
              </p>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}

