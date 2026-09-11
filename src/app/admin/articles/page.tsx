import type { Metadata } from "next";
import { ArticleEditor } from "./article-editor";

export const metadata: Metadata = {
  title: "Article Workbench | Admin",
  robots: { index: false, follow: false },
};

export default function AdminArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Article Workbench</h1>
          <p className="text-sm text-gray-500 mt-1">
            按《Aikerui SEO/GEO 文章规则》填写 —— 右侧实时检查，达标后一键发布。
            写前先查 <a href="/admin/keywords" className="text-accent underline">Keyword Map</a> 避免抢词。
          </p>
        </div>
        <ArticleEditor />
      </div>
    </div>
  );
}
