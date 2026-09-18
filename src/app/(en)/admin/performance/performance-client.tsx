"use client";

import { useMemo, useState } from "react";

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
  published: string;
  inLinks: number;
}
interface ContentIndex {
  generatedAt: string;
  totalGuides: number;
  orphans: { slug: string; title: string; url: string }[];
  guides: GuideIdx[];
}

interface Row {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

/** 解析 GSC 导出的 CSV（兼容中英文表头） */
function parseGscCsv(text: string, keyNames: string[]): Row[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const header = lines[0].split(",").map((h) => h.replace(/^"|"$/g, "").trim());
  const findCol = (names: string[]) => header.findIndex((h) => names.some((n) => h.toLowerCase().includes(n.toLowerCase())));
  const iKey = findCol(keyNames);
  const iClicks = findCol(["clicks", "点击次数"]);
  const iImpr = findCol(["impressions", "展示次数"]);
  const iCtr = findCol(["ctr", "点击率"]);
  const iPos = findCol(["position", "平均排名"]);
  if (iKey < 0) return [];

  const num = (s: string) => Number(String(s).replace(/[",%\s]/g, "")) || 0;
  return lines
    .slice(1)
    .map((line) => {
      const c = line.split(",");
      return {
        key: (c[iKey] || "").replace(/^"|"$/g, "").trim(),
        clicks: num(c[iClicks] ?? "0"),
        impressions: num(c[iImpr] ?? "0"),
        ctr: num(c[iCtr] ?? "0"),
        position: num(c[iPos] ?? "0"),
      };
    })
    .filter((r) => r.key);
}

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

export function PerformanceClient({ keywords, contentIndex }: { keywords: Kw[]; contentIndex: ContentIndex }) {
  const [qRows, setQRows] = useState<Row[]>([]);
  const [pRows, setPRows] = useState<Row[]>([]);
  const [qName, setQName] = useState("");
  const [pName, setPName] = useState("");

  const readFile = async (f: File, kind: "queries" | "pages") => {
    const text = await f.text();
    const rows = kind === "queries" ? parseGscCsv(text, ["top queries", "查询", "queries"]) : parseGscCsv(text, ["page", "网页", "url"]);
    if (kind === "queries") {
      setQRows(rows);
      setQName(f.name);
    } else {
      setPRows(rows);
      setPName(f.name);
    }
  };

  const analysis = useMemo(() => {
    if (!qRows.length && !pRows.length) return null;

    const totalImpr = qRows.reduce((s, r) => s + r.impressions, 0);
    const totalClicks = qRows.reduce((s, r) => s + r.clicks, 0);

    // 1) 机会词：排名 8-20 且有曝光（离首页一步）
    const opportunities = qRows
      .filter((r) => r.position >= 8 && r.position <= 20 && r.impressions >= 20)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 20);

    // 2) 高曝光低 CTR：曝光够但点击率低 → 改 title/description
    const lowCtr = qRows
      .filter((r) => r.impressions >= 100 && r.ctr < 1.5)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 20);

    // 3) 内容缺口：有搜索量但站内无匹配页面
    const knownText = keywords.map((k) => k.keyword.toLowerCase());
    const gaps = qRows
      .filter((r) => r.impressions >= 30)
      .filter((r) => {
        const ql = r.key.toLowerCase();
        const words = ql.split(/\s+/).filter((w) => w.length > 2);
        return !knownText.some((k) => {
          const overlap = words.filter((w) => k.includes(w)).length;
          return words.length > 0 && overlap / words.length >= 0.7;
        });
      })
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 20);

    // 4) 零曝光已发布页（GSC 页面报告里没出现）→ 生命周期判断
    const pageSet = new Set(pRows.map((r) => r.key.replace(/^https?:\/\/[^/]+/, "").replace(/\/$/, "")));
    const dead = pRows.length
      ? contentIndex.guides.filter((g) => !pageSet.has(g.url) && g.inLinks >= 0).slice(0, 30)
      : [];

    return { totalImpr, totalClicks, opportunities, lowCtr, gaps, dead };
  }, [qRows, pRows, keywords, contentIndex]);

  const exportCsv = () => {
    if (!analysis) return;
    const lines = ["type,key,clicks,impressions,ctr,position"];
    analysis.opportunities.forEach((r) => lines.push(`opportunity,"${r.key}",${r.clicks},${r.impressions},${r.ctr},${r.position}`));
    analysis.lowCtr.forEach((r) => lines.push(`low_ctr,"${r.key}",${r.clicks},${r.impressions},${r.ctr},${r.position}`));
    analysis.gaps.forEach((r) => lines.push(`gap,"${r.key}",${r.clicks},${r.impressions},${r.ctr},${r.position}`));
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "aikerui-performance-analysis.csv";
    a.click();
  };

  return (
    <div>
      {/* 上传 */}
      <div className="bg-white rounded-xl border-2 border-primary/25 p-5 mb-6">
        <h2 className="font-bold text-gray-900 mb-1">上传 GSC 数据</h2>
        <p className="text-xs text-gray-500 mb-4">
          Google Search Console → 效果 → 分别切到「查询」和「网页」→ 右上角导出 CSV → 上传到这里
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <input type="file" accept=".csv,.txt" className="hidden" onChange={(e) => e.target.files?.[0] && readFile(e.target.files[0], "queries")} />
            <span className="block w-full text-center py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 cursor-pointer hover:border-accent hover:text-accent">
              {qRows.length ? `✅ 查询数据 ${qRows.length} 行（${qName}）` : "+ 上传「查询」CSV"}
            </span>
          </label>
          <label className="block">
            <input type="file" accept=".csv,.txt" className="hidden" onChange={(e) => e.target.files?.[0] && readFile(e.target.files[0], "pages")} />
            <span className="block w-full text-center py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 cursor-pointer hover:border-accent hover:text-accent">
              {pRows.length ? `✅ 网页数据 ${pRows.length} 行（${pName}）` : "+ 上传「网页」CSV"}
            </span>
          </label>
        </div>
      </div>

      {!analysis && <p className="text-center text-gray-500 py-16 text-sm">上传 CSV 后自动分析</p>}

      {analysis && (
        <>
          {/* 概览 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { l: "总曝光", v: analysis.totalImpr.toLocaleString() },
              { l: "总点击", v: analysis.totalClicks.toLocaleString() },
              { l: "平均 CTR", v: analysis.totalImpr ? ((analysis.totalClicks / analysis.totalImpr) * 100).toFixed(2) + "%" : "—" },
              { l: "孤立页（站内）", v: contentIndex.orphans.length },
            ].map((s) => (
              <div key={s.l} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="text-2xl font-bold text-primary">{s.v}</div>
                <div className="text-xs text-gray-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mb-2">
            <button onClick={exportCsv} className="text-xs px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-light">
              导出分析结果 CSV
            </button>
          </div>

          {/* 1 机会词 */}
          <Card title="机会词（排名 8-20，离首页一步）" count={analysis.opportunities.length} tone="green" hint="优先优化这些页面：加内链、补内容、改 title 都能推动进首页">
            {analysis.opportunities.map((r) => (
              <div key={r.key} className="flex items-center gap-3 text-xs py-1.5 border-b border-gray-100 last:border-0">
                <span className="flex-1 text-gray-800">{r.key}</span>
                <span className="text-gray-400 font-mono w-14 text-right">#{r.position.toFixed(1)}</span>
                <span className="text-gray-400 font-mono w-16 text-right">{r.impressions} 曝光</span>
              </div>
            ))}
            {!analysis.opportunities.length && <p className="text-xs text-gray-400">（暂无）</p>}
          </Card>

          {/* 2 低 CTR */}
          <Card title="高曝光低 CTR（改 title / description）" count={analysis.lowCtr.length} tone="amber" hint="曝光够但没人点 → 标题/描述不够吸引，或与搜索意图不匹配">
            {analysis.lowCtr.map((r) => (
              <div key={r.key} className="flex items-center gap-3 text-xs py-1.5 border-b border-gray-100 last:border-0">
                <span className="flex-1 text-gray-800">{r.key}</span>
                <span className="text-amber-600 font-mono w-16 text-right">{r.ctr.toFixed(2)}%</span>
                <span className="text-gray-400 font-mono w-16 text-right">{r.impressions} 曝光</span>
              </div>
            ))}
            {!analysis.lowCtr.length && <p className="text-xs text-gray-400">（暂无）</p>}
          </Card>

          {/* 3 内容缺口 */}
          <Card title="内容缺口（有搜索但站内无对应页面）" count={analysis.gaps.length} tone="blue" hint="这些词有人搜、你有曝光，但关键词库里没有对应页面 → 待写清单">
            {analysis.gaps.map((r) => (
              <div key={r.key} className="flex items-center gap-3 text-xs py-1.5 border-b border-gray-100 last:border-0">
                <span className="flex-1 text-gray-800">{r.key}</span>
                <span className="text-blue-600 font-mono w-16 text-right">{r.impressions} 曝光</span>
                <span className="text-gray-400 font-mono w-14 text-right">#{r.position.toFixed(1)}</span>
              </div>
            ))}
            {!analysis.gaps.length && <p className="text-xs text-gray-400">（暂无）</p>}
          </Card>

          {/* 4 零曝光页 */}
          {analysis.dead.length > 0 && (
            <Card title="零曝光已发布页（生命周期：更新 / 合并 / 删除）" count={analysis.dead.length} tone="red" hint="这些页面在 GSC 页面报告里没出现 → 按标准判断该更新、合并还是处理掉">
              {analysis.dead.map((g) => (
                <div key={g.slug} className="flex items-center gap-3 text-xs py-1.5 border-b border-gray-100 last:border-0">
                  <a href={g.url} target="_blank" rel="noopener" className="flex-1 text-gray-800 hover:text-accent truncate">{g.title || g.slug}</a>
                  <span className="text-gray-400 font-mono">{g.inLinks} 入链</span>
                </div>
              ))}
            </Card>
          )}

          {/* 5 孤岛页（站内） */}
          {contentIndex.orphans.length > 0 && (
            <Card title="站内孤立页（0 入链，需补内链）" count={contentIndex.orphans.length} tone="red" hint="没有其他页面链接到它们 → Google 不易发现，权重也传不到">
              {contentIndex.orphans.slice(0, 20).map((o) => (
                <div key={o.slug} className="text-xs py-1.5 border-b border-gray-100 last:border-0">
                  <a href={o.url} target="_blank" rel="noopener" className="text-gray-800 hover:text-accent">{o.title || o.slug}</a>
                </div>
              ))}
            </Card>
          )}
        </>
      )}
    </div>
  );
}
