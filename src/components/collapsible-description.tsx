"use client";

import { useState } from "react";

export function CollapsibleDescription({
  html,
  threshold = 800,
}: {
  html: string;
  threshold?: number;
}) {
  const stripped = html.replace(/<[^>]*>/g, "");
  const isLong = stripped.length > threshold;
  const [open, setOpen] = useState(false);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
      <div
        className={`text-gray-700 leading-relaxed max-w-none [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1.5 [&_p]:mb-3 [&_strong]:text-gray-900 ${
          isLong && !open ? "max-h-[400px] overflow-hidden relative" : ""
        }`}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {isLong && !open && (
        <div className="relative -mt-16 pb-4 bg-gradient-to-t from-white to-transparent pt-16 text-center">
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
          >
            Read Full Description ↓
          </button>
        </div>
      )}
      {isLong && open && (
        <div className="text-center mt-2">
          <button
            onClick={() => setOpen(false)}
            className="text-sm text-primary hover:underline"
          >
            Show Less ↑
          </button>
        </div>
      )}
    </section>
  );
}
