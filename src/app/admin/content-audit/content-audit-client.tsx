"use client";

import { useMemo, useState } from "react";

interface Kw {
  keyword: string;
  cluster: string;
  businessValue: string;
  intent: string;
  targetUrl: string;
  status: string;
}
interface GuideIdx {
  slug: string;
  url: string;
  title: string;
  category: string;
  published: string;
  wordCount: number;
  relatedGuides: string[];
  bodyLinks: string[];
  outLinks: number;
  inLinks: number;
  inLinkFrom: string[];
}
interface ContentIndex {
  generatedAt: string;
  totalGuides: number;
  orphans: { slug: string; title: string; url: string }[];
  hubs: { slug: string; inLinks: number }[];
  guides: GuideIdx[];
}

const VALUE_COLOR: Record<string, string> = {
  S: "bg-red-100 text-red-700",
  A: "bg-amber-100 text-amber-700",
  B: "bg-gray-100 text-gray-600",
};

function Card({ title, count, hint, tone = "gray", children }: { title: string; count?: number; hint?: string; tone?: string; children?: React.ReactNode }) {
  const border = { red: "border-red-200", amber: "border-amber-200", green: "border-green-200", blue: "border-blue-200", gray: "border-gray-200" }[tone] || "border-gray-200";
  return (
    <div className={`bg-white rounded-xl border ${border} p-5 mb-4`}>
      <div className="flex items-baseline justify-between mb-1">
        <h2 className="font-bold text-gray-900">{title}</h2>
        {count !== undefined && <span className="text-sm font-bold text-gray-500">{count}</span>}
      </div>
      {hint && <p className="text-xs text-gray-500 mb-3">{hint}</p>}
      {children}
    </div>
  );
}

export function ContentAuditClient({ keywords, contentIndex }: { keywords: Kw[]; contentIndex: ContentIndex }) {
  const [tab, setTab] = useState<"gaps" | "links">("gaps");

  const audit = useMemo(() => {
    const guideUrls = new Set(contentIndex.guides.map((g) => g.url));

    // 关键词 slug 化，用于匹配 guide slug
    const kwSlug = (k: Kw) => k.keyword.replace(/\s+/g, "-");

    // 1) 有词无页：关键词库的 targetUrl 是 /guides/xxx，但站内不存在该 guide
    const missing = keywords
      .filter((k) => k.targetUrl.startsWith("/guides/") && !guideUrls.has(k.targetUrl))
      .sort((a, b) => "SAB".indexOf(a.businessValue) - "SAB".indexOf(b.businessValue));

    // 2) 有页无词：guide 未进关键词库
    const kwTargets = new Set(keywords.map((k) => k.targetUrl));
    const unmapped = contentIndex.guides.filter((g) => !kwTargets.has(g.url));

    // 3) 内链：孤立页
    const orphans = contentIndex.orphans;

    // 4) 建议补链对：同 cluster 但互不链接
    const slugToCluster: Record<string, string> = {};
    keywords.forEach((k) => {
      const s = k.targetUrl.replace("/guides/", "");
      if (k.targetUrl.startsWith("/guides/")) slugToCluster[s] = k.cluster;
    });
    const bySlug = Object.fromEntries(contentIndex.guides.map((g) => [g.slug, g]));
    const suggestions: { from: string; to: string; cluster: string; fromTitle: string; toTitle: string }[] = [];
    const clusters: Record<string, string[]> = {};
    contentIndex.guides.forEach((g) => {
      const c = slugToCluster[g.slug];
      if (c) (clusters[c] = clusters[c] || []).push(g.slug);
    });
    Object.entries(clusters).forEach(([cluster, slugs]) => {
      if (slugs.length < 2 || slugs.length > 12) return; // 太大的集群不逐对建议
      for (let i = 0; i < slugs.length; i++) {
        for (let j = 0; j < slugs.length; j++) {
          if (i === j) continue;
          const a = bySlug[slugs[i]];
          const b = bySlug[slugs[j]];
          if (!a || !b) continue;
          const linksToB = a.relatedGuides.includes(b.slug) || a.bodyLinks.includes(b.url);
          // 只建议弱链页面之间补链（目标入链少），且避免重复对
          if (!linksToB && b.inLinks < 4) {
            suggestions.push({ from: a.slug, to: b.slug, cluster, fromTitle: a.title, toTitle: b.title });
          }
        }
      }
    });

    // 去重（A→B 与 B→A 保留一个）
    const seen = new Set<string>();
    const dedup = suggestions.filter((s) => {
      const key = [s.from, s.to].sort().join("|");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // 5) 统计
    const covered = contentIndex.guides.filter((g) => kwTargets.has(g.url)).length;
    const coverRate = contentIndex.guides.length ? Math.round((covered / contentIndex.guides.length) * 100) : 0;
    const avgIn = contentIndex.guides.length
      ? (contentIndex.guides.reduce((s, g) => s + g.inLinks, 0) / contentIndex.guides.length).toFixed(1)
      : "0";

    return { missing, unmapped, orphans, suggestions: dedup.slice(0, 30), coverRate, avgIn };
  }, [keywords, contentIndex]);

  const exportCsv = (type: string, rows: string[][]) => {
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `aikerui-${type}.csv`;
    a.click();
  };

  return (
    <div>
      {/* 概览 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { l: "关键词库", v: keywords.length },
          { l: "已发布 guides", v: contentIndex.totalGuides },
          { l: "关键词覆盖率", v: audit.coverRate + "%" },
          { l: "孤立页（0 入链）", v: audit.orphans.length },
          { l: "平均入链", v: audit.avgIn },
        ].map((s) => (
          <div key={s.l} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-primary">{s.v}</div>
            <div className="text-xs text-gray-500 mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Tab */}
      <div className="flex gap-2 mb-4">
        {[
          { k: "gaps" as const, l: "内容缺口" },
          { k: "links" as const, l: "内链审计" },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              tab === t.k ? "bg-primary text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-primary"
            }`}
          >
            {t.l}
          </button>
        ))}
      </div>

      {tab === "gaps" && (
        <>
          <Card
            title="有词无页（待写清单）"
            count={audit.missing.length}
            tone="blue"
            hint="关键词库里有、但站内还没有对应页面 → 按商业价值排序写"
          >
            <div className="flex justify-end mb-2">
              <button
                onClick={() => exportCsv("content-gaps", [["keyword", "cluster", "value", "intent", "plannedUrl"], ...audit.missing.map((k) => [k.keyword, k.cluster, k.businessValue, k.intent, k.targetUrl])])}
                className="text-xs px-3 py-1 bg-primary text-white rounded"
              >
                导出 CSV
              </button>
            </div>
            {audit.missing.map((k) => (
              <div key={k.targetUrl} className="flex items-center gap-3 text-xs py-1.5 border-b border-gray-100 last:border-0">
                <span className="flex-1 text-gray-800">{k.keyword}</span>
                <span className="text-gray-400">{k.cluster}</span>
                <span className={`px-1.5 py-0.5 rounded font-semibold ${VALUE_COLOR[k.businessValue] || ""}`}>{k.businessValue}</span>
              </div>
            ))}
            {!audit.missing.length && <p className="text-xs text-gray-400">（关键词库与已发布页面完全对齐 ✅）</p>}
          </Card>

          <Card
            title="有页无词（该补关键词映射）"
            count={audit.unmapped.length}
            tone="amber"
            hint="已发布的 guide 没进关键词库 → 补进 keywords.json，否则抢词检查看不见它"
          >
            {audit.unmapped.slice(0, 25).map((g) => (
              <div key={g.slug} className="flex items-center gap-3 text-xs py-1.5 border-b border-gray-100 last:border-0">
                <a href={g.url} target="_blank" rel="noopener" className="flex-1 text-gray-800 hover:text-accent truncate">{g.title || g.slug}</a>
                <span className="text-gray-400 font-mono">{g.inLinks} 入链</span>
              </div>
            ))}
            {!audit.unmapped.length && <p className="text-xs text-gray-400">（全部已映射 ✅）</p>}
          </Card>
        </>
      )}

      {tab === "links" && (
        <>
          <Card
            title="孤立页（0 入链，最该补）"
            count={audit.orphans.length}
            tone="red"
            hint="没有任何其他页面链接到它们 → Google 难发现，权重传不进去"
          >
            {audit.orphans.map((o) => (
              <div key={o.slug} className="text-xs py-1.5 border-b border-gray-100 last:border-0">
                <a href={o.url} target="_blank" rel="noopener" className="text-gray-800 hover:text-accent">{o.title || o.slug}</a>
              </div>
            ))}
            {!audit.orphans.length && <p className="text-xs text-gray-400">（无孤立页 ✅）</p>}
          </Card>

          <Card
            title="建议补链对（同集群、弱链、互不链接）"
            count={audit.suggestions.length}
            tone="green"
            hint="把这些链接加进对应 guide 的 relatedGuides，可同时消解孤立页 + 加强主题集群"
          >
            <div className="flex justify-end mb-2">
              <button
                onClick={() => exportCsv("internal-link-plan", [["fromSlug", "toSlug", "cluster", "fromTitle", "toTitle"], ...audit.suggestions.map((s) => [s.from, s.to, s.cluster, s.fromTitle, s.toTitle])])}
                className="text-xs px-3 py-1 bg-primary text-white rounded"
              >
                导出补链计划
              </button>
            </div>
            {audit.suggestions.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs py-1.5 border-b border-gray-100 last:border-0">
                <span className="text-gray-500 truncate w-52" title={s.from}>{s.from}</span>
                <span className="text-accent">→</span>
                <span className="text-gray-800 truncate flex-1" title={s.to}>{s.to}</span>
                <span className="text-gray-400 shrink-0">{s.cluster}</span>
              </div>
            ))}
            {!audit.suggestions.length && <p className="text-xs text-gray-400">（暂无建议）</p>}
          </Card>

          <Card title="入链最多的页面（Pillar 候选）" count={contentIndex.hubs.length} tone="gray" hint="这些页应作为集群核心，从各文章链回">
            {contentIndex.hubs.map((h) => (
              <div key={h.slug} className="flex items-center gap-3 text-xs py-1.5 border-b border-gray-100 last:border-0">
                <span className="flex-1 text-gray-800 truncate">{h.slug}</span>
                <span className="text-primary font-bold font-mono">{h.inLinks}</span>
              </div>
            ))}
          </Card>
        </>
      )}
    </div>
  );
}
