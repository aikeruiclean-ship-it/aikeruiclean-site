import type { Metadata } from "next";
import keywords from "@/lib/keywords.json";
import { ArticleEditor } from "./article-editor";

export const metadata: Metadata = {
  title: "Article Workbench | Admin",
  robots: { index: false, follow: false },
};

export default function AdminArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Article Workbench</h1>
          <p className="text-sm text-gray-500 mt-1">
            一个页面完成：选关键词（含抢词检查）→ 写文案（12 项实时检查）→ 一键发布。
          </p>
        </div>
        <ArticleEditor keywords={keywords as never} />
      </div>
    </div>
  );
}
