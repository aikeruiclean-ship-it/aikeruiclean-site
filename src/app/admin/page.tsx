import Link from "next/link";
import keywords from "@/lib/keywords.json";
import contentIndex from "@/lib/content-index.json";
import products from "@/lib/products.json";

interface Kw {
  keyword: string;
  cluster: string;
  businessValue: string;
  targetUrl: string;
}
interface GuideIdx {
  slug: string;
  url: string;
  title: string;
  inLinks: number;
}
interface ContentIndex {
  generatedAt: string;
  totalGuides: number;
  orphans: { slug: string; title: string; url: string }[];
  guides: GuideIdx[];
}

function Stat({ label, value, sub, tone = "primary" }: { label: string; value: string | number; sub?: string; tone?: string }) {
  const color = { primary: "text-primary", red: "text-red-600", amber: "text-amber-600", green: "text-green-600" }[tone] || "text-primary";
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}

function ModuleCard({ href, label, desc, metric, tone = "gray" }: { href: string; label: string; desc: string; metric?: string; tone?: string }) {
  const border = { red: "border-red-200", amber: "border-amber-200", green: "border-green-200", blue: "border-blue-200", gray: "border-gray-200" }[tone] || "border-gray-200";
  return (
    <Link href={href} className={`block bg-white rounded-xl border ${border} p-5 hover:shadow-md hover:border-primary transition-all`}>
      <div className="flex items-baseline justify-between">
        <h3 className="font-bold text-gray-900">{label}</h3>
        {metric && <span className="text-xs font-semibold text-gray-500">{metric}</span>}
      </div>
      <p className="text-xs text-gray-500 mt-1.5">{desc}</p>
    </Link>
  );
}

export default function AdminHomePage() {
  const kws = keywords as Kw[];
  const ci = contentIndex as ContentIndex;

  const guideUrls = new Set(ci.guides.map((g) => g.url));
  const kwTargets = new Set(kws.map((k) => k.targetUrl));

  const missingPages = kws.filter((k) => k.targetUrl.startsWith("/guides/") && !guideUrls.has(k.targetUrl));
  const unmapped = ci.guides.filter((g) => !kwTargets.has(g.url));
  const orphanCount = ci.orphans.length;

  const sLevelMissing = missingPages.filter((k) => k.businessValue === "S");

  // 自动待办
  const todos: { text: string; href: string; tone: string }[] = [];
  if (orphanCount > 0)
    todos.push({ text: `补 ${orphanCount} 个孤立页的内链（用「建议补链对」导出计划）`, href: "/admin/content-audit", tone: "red" });
  if (sLevelMissing.length > 0)
    todos.push({ text: `写 ${sLevelMissing.length} 篇 S 级关键词文章：${sLevelMissing.slice(0, 3).map((k) => k.keyword).join("、")}${sLevelMissing.length > 3 ? " 等" : ""}`, href: "/admin/content-audit", tone: "amber" });
  if (unmapped.length > 0)
    todos.push({ text: `${unmapped.length} 篇已发布文章未进关键词库（抢词检查看不见它们）`, href: "/admin/content-audit", tone: "amber" });
  todos.push({ text: "导出 GSC 数据（查询 + 网页 CSV）上传，看机会词与 CTR 问题", href: "/admin/performance", tone: "blue" });

  const productCount = Array.isArray(products) ? products.length : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">运营概览</h1>
        <p className="text-sm text-gray-500 mt-1">
          数据索引生成于 {ci.generatedAt}　·　改过 guides.ts 后需重跑 <code className="text-xs bg-gray-100 px-1 rounded">gen-content-index.cjs</code>
        </p>
      </div>

      {/* 概览指标 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Stat label="关键词库" value={kws.length} sub={`S 级 ${kws.filter((k) => k.businessValue === "S").length} 个`} />
        <Stat label="已发布文章" value={ci.totalGuides} sub={`平均入链 ${(ci.guides.reduce((s, g) => s + g.inLinks, 0) / (ci.guides.length || 1)).toFixed(1)}`} />
        <Stat label="孤立页（0 入链）" value={orphanCount} sub="需补内链" tone={orphanCount > 0 ? "red" : "green"} />
        <Stat label="产品页" value={productCount} sub="整机 + 配件" />
      </div>

      {/* 待办 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-4">待办（自动生成）</h2>
        <ul className="space-y-2.5">
          {todos.map((t, i) => (
            <li key={i}>
              <Link href={t.href} className="flex items-start gap-3 group">
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${{ red: "bg-red-500", amber: "bg-amber-500", blue: "bg-blue-500" }[t.tone] || "bg-gray-400"}`} />
                <span className="text-sm text-gray-700 group-hover:text-primary">{t.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 模块入口 */}
      <h2 className="font-bold text-gray-900 mb-4">功能模块</h2>

      <div className="mb-3">
        <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2">内容生产</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ModuleCard href="/admin/keywords" label="Keyword Map" desc="107 条关键词库 + 抢词检查器（防关键词蚕食）" metric={`${kws.length} 词`} tone="blue" />
          <ModuleCard href="/admin/articles" label="Article Workbench" desc="全字段写文章 + 12 项实时检查 + 一键发布到 GitHub" metric={`${ci.totalGuides} 篇`} tone="blue" />
        </div>
      </div>

      <div className="mb-3 mt-6">
        <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2">数据分析</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ModuleCard href="/admin/performance" label="Performance Loop" desc="上传 GSC CSV → 机会词 / CTR 问题 / 内容缺口 / 生命周期判断" metric="需上传" tone="green" />
          <ModuleCard href="/admin/content-audit" label="Content Audit" desc="关键词↔页面缺口 + 内链审计（孤立页 / 建议补链对）" metric={`${orphanCount} 孤立`} tone={orphanCount > 0 ? "red" : "green"} />
        </div>
      </div>

      <div className="mb-3 mt-6">
        <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2">客户运营</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ModuleCard href="/admin/leads" label="Leads" desc="网站询盘记录（HubSpot 为主库）" />
          <ModuleCard href="/admin/reviews" label="Reviews" desc="客户评价提交审核" />
          <ModuleCard href="/admin/whatsapp" label="WhatsApp Clicks" desc="WhatsApp 按钮点击追踪" />
        </div>
      </div>
    </div>
  );
}
