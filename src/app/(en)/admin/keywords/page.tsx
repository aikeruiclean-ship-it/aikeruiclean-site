import type { Metadata } from "next";
import keywords from "@/lib/keywords.json";
import { KeywordsClient } from "./keywords-client";

export const metadata: Metadata = {
  title: "Keyword Map | Admin",
  robots: { index: false, follow: false },
};

export default function AdminKeywordsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <KeywordsClient keywords={keywords as never} />
      </div>
    </div>
  );
}
