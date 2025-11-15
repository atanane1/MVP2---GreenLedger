"use client";

import { KpiSummary } from "@/lib/types";

interface KpiCardsProps {
  kpis: KpiSummary;
}

export function KpiCards({ kpis }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-green-500/50 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">GHG Emissions</h3>
          <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center">
            <span className="text-green-500 text-sm">🌱</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-white mb-1">
          {kpis.totalEmissions !== undefined
            ? kpis.totalEmissions.toLocaleString()
            : "—"}
        </p>
        <p className="text-xs text-gray-500">ESRS E1-1</p>
        {kpis.totalEmissions === undefined && (
          <p className="text-xs text-amber-500 mt-1">No data mapped</p>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-green-500/50 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Employees</h3>
          <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center">
            <span className="text-green-500 text-sm">👥</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-white mb-1">
          {kpis.totalEmployees !== undefined ? kpis.totalEmployees.toLocaleString() : "—"}
        </p>
        <p className="text-xs text-gray-500">ESRS S1-1</p>
        {kpis.totalEmployees === undefined && (
          <p className="text-xs text-amber-500 mt-1">No data mapped</p>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-green-500/50 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Governance</h3>
          <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center">
            <span className="text-green-500 text-sm">⚖️</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-white mb-1">
          {kpis.governancePoints !== undefined ? kpis.governancePoints : "—"}
        </p>
        <p className="text-xs text-gray-500">Data Points</p>
        {kpis.governancePoints === undefined && (
          <p className="text-xs text-amber-500 mt-1">No data mapped</p>
        )}
      </div>
    </div>
  );
}

