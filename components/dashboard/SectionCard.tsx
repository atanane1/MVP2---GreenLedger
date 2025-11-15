"use client";

import Link from "next/link";

interface SectionCardProps {
  title: string;
  description: string;
  href: string;
  icon?: string;
}

export function SectionCard({ title, description, href, icon }: SectionCardProps) {
  return (
    <Link
      href={href}
      className="block bg-white shadow-sm border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-green-300 transition-all group"
    >
      <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-green-700 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
        Get started
        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

