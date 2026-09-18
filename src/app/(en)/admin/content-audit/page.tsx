import type { Metadata } from "next";
import keywords from "@/lib/keywords.json";
import contentIndex from "@/lib/content-index.json";
import { ContentAuditClient } from "./content-audit-client";

export const metadata: Metadata = {
  title: "Content Audit | Admin",
  robots: { index: false, follow: false },
};

export default function AdminContentAuditPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Content Audit</h1>
          <p className="text-sm text-gray-500 mt-1">
            关键词库 ↔ 实际页面 的缺口分析 + 内链结构审计（无需上传，自动从站内数据计算）
          </p>
        </div>
        <ContentAuditClient keywords={keywords as never} contentIndex={contentIndex as never} />
      </div>
    </div>
  );
}
