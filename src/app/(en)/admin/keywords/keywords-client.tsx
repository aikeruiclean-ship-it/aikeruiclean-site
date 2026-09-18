"use client";

import { useMemo, useState } from "react";

export interface KeywordEntry {
  keyword: string;
  cluster: string;
  intent: string;
  businessValue: "S" | "A" | "B" | "C";
  isPrimary: boolean;
  targetUrl: string;
  pageType: string;
  status: string;
  title?: string;
}

const VALUE_COLOR: Record<string, string> = {
  S: "bg-red-100 text-red-700 border-red-200",
  A: "bg-amber-100 text-amber-700 border-amber-200",
  B: "bg-gray-100 text-gray-600 border-gray-200",
  C: "bg-gray-50 text-gray-500 border-gray-200",
};

const INTENT_COLOR: Record<string, string> = {
  transactional: "bg-green-100 text-green-700",
  commercial: "bg-blue-100 text-blue-700",
  informational: "bg-gray-100 text-gray-600",
  navigational: "bg-purple-100 text-purple-700",
};

export function KeywordsClient({ keywords }: { keywords: KeywordEntry[] }) {
  const [q, setQ] = useState("");
  const [cluster, setCluster] = useState("");
  const [intent, setIntent] = useState("");
  const [value, setValue] = useState("");
  const [checkerInput, setCheckerInput] = useState("");

  const clusters = useMemo(() => [...new Set(keywords.map((k) => k.cluster))].sort(), [keywords]);
  const intents = useMemo(() => [...new Set(keywords.map((k) => k.intent))].sort(), [keywords]);

  const filtered = useMemo(() => {
    const ql = q.toLowerCase();
    return keywords.filter(
      (k) =>
        (!ql || k.keyword.toLowerCase().includes(ql) || (k.title || "").toLowerCase().includes(ql)) &&
        (!cluster || k.cluster === cluster) &&
        (!intent || k.intent === intent) &&
        (!value || k.businessValue === value)
    );
  }, [keywords, q, cluster, intent, value]);

  // ── 抢词检查器：按标准的「同一搜索意图 → 同一 Primary URL」原则 ──
  const checkResult = useMemo(() => {
    const input = checkerInput.trim().toLowerCase();
    if (!input) return null;
    const words = input.split(/\s+/).filter((w) => w.length > 2);

    const scored = keywords
      .map((k) => {
        const kl = k.keyword.toLowerCase();
        let score = 0;
        if (kl === input) score = 100;
        else if (kl.includes(input) || input.includes(kl)) score = 70;
        else {
          const overlap = words.filter((w) => kl.includes(w)).length;
          score = words.length ? Math.round((overlap / words.length) * 60) : 0;
        }
        return { k, score };
      })
      .filter((x) => x.score >= 40)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    // 判定：找到 intent 相同 → 高风险（应复用该 URL）
    const sameIntentHigh = scored.filter((x) => x.score >= 70);
    const verdict =
      sameIntentHigh.length > 0
        ? "high"
        : scored.length > 0
        ? "medium"
        : "low";

    return { scored, verdict };
  }, [keywords, checkerInput]);

  const stats = useMemo(() => {
    const by = (f: keyof KeywordEntry) =>
      keywords.reduce<Record<string, number>>((o, k) => {
        const key = String(k[f]);
        o[key] = (o[key] || 0) + 1;
        return o;
      }, {});
    return { value: by("businessValue"), intent: by("intent") };
  }, [keywords]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Keyword Map</h1>
        <p className="text-sm text-gray-500 mt-1">
          一个搜索意图 = 一个 Primary URL。新建文章前先在这里查，避免关键词蚕食。
        </p>
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "关键词总数", value: keywords.length },
          { label: "S 级（商业价值最高）", value: stats.value.S || 0 },
          { label: "主题集群", value: clusters.length },
          { label: "Transactional 意图", value: stats.intent.transactional || 0 },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 抢词检查器 */}
      <div className="bg-white rounded-xl border-2 border-accent/30 p-5 mb-6">
        <h2 className="font-bold text-gray-900 mb-1">抢词检查器</h2>
        <p className="text-xs text-gray-500 mb-3">
          输入候选主词，检查站内是否已有页面覆盖同一搜索意图
        </p>
        <input
          type="text"
          value={checkerInput}
          onChange={(e) => setCheckerInput(e.target.value)}
          placeholder="e.g. floor scrubber brush manufacturer"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent"
        />
        {checkResult && (
          <div className="mt-4">
            {checkResult.verdict === "high" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                <p className="text-sm font-semibold text-red-700">
                  高风险：站内已有高度接近的关键词
                </p>
                <p className="text-xs text-red-600 mt-1">
                  建议复用现有 URL（扩展内容），而不是新建页面。确需新建，必须换一个「搜索意图」。
                </p>
              </div>
            )}
            {checkResult.verdict === "medium" && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                <p className="text-sm font-semibold text-amber-700">中等风险：存在部分重叠</p>
                <p className="text-xs text-amber-600 mt-1">
                  检查这些页面的搜索意图是否与你新文章一致。一致则复用或合并。
                </p>
              </div>
            )}
            {checkResult.verdict === "low" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                <p className="text-sm font-semibold text-green-700">低风险：未发现明显冲突</p>
                <p className="text-xs text-green-600 mt-1">
                  可以新建页面。记得同时更新关键词库（记录 Primary URL）。
                </p>
              </div>
            )}
            {checkResult.scored.length > 0 && (
              <div className="space-y-2">
                {checkResult.scored.map(({ k, score }) => (
                  <div key={k.targetUrl} className="flex items-center gap-3 text-sm bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-xs font-mono text-gray-400 w-10">{score}%</span>
                    <span className="flex-1 text-gray-800">{k.keyword}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${INTENT_COLOR[k.intent] || ""}`}>{k.intent}</span>
                    <a href={k.targetUrl} target="_blank" rel="noopener" className="text-xs text-accent hover:underline font-mono">
                      {k.targetUrl}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 筛选 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索关键词…"
          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent"
        />
        <select value={cluster} onChange={(e) => setCluster(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
          <option value="">全部集群</option>
          {clusters.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={intent} onChange={(e) => setIntent(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
          <option value="">全部意图</option>
          {intents.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        <select value={value} onChange={(e) => setValue(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
          <option value="">全部等级</option>
          <option value="S">S 级</option>
          <option value="A">A 级</option>
          <option value="B">B 级</option>
        </select>
      </div>

      {/* 表格 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Keyword</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Cluster</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Intent</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Value</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Page Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Target URL</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((k) => (
                <tr key={k.targetUrl + k.keyword} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-gray-900">{k.keyword}</td>
                  <td className="px-4 py-2.5 text-xs text-gray-500">{k.cluster}</td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded ${INTENT_COLOR[k.intent] || ""}`}>{k.intent}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded border font-semibold ${VALUE_COLOR[k.businessValue] || ""}`}>
                      {k.businessValue}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-gray-600">{k.pageType}</td>
                  <td className="px-4 py-2.5">
                    <a href={k.targetUrl} target="_blank" rel="noopener" className="text-xs text-accent hover:underline font-mono">
                      {k.targetUrl}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-10 text-sm">没有匹配的关键词</p>
        )}
        <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 border-t border-gray-200">
          显示 {filtered.length} / {keywords.length} 条
        </div>
      </div>
    </div>
  );
}
