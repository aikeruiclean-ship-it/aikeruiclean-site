import type { Metadata } from "next";
import keywords from "@/lib/keywords.json";
import contentIndex from "@/lib/content-index.json";
import { PerformanceClient } from "./performance-client";

export const metadata: Metadata = {
  title: "Performance Loop | Admin",
  robots: { index: false, follow: false },
};

export default function AdminPerformancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Performance Loop</h1>
          <p className="text-sm text-gray-500 mt-1">
            上传 GSC 导出数据 → 自动找出机会词、CTR 问题、内容缺口与需处置的页面（数据 → 判断闭环）
          </p>
        </div>
        <PerformanceClient keywords={keywords as never} contentIndex={contentIndex as never} />
      </div>
    </div>
  );
}
