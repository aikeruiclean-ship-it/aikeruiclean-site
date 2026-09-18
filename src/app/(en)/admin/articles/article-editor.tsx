"use client";

import { useMemo, useState } from "react";
import { ReferenceUpload } from "./reference-upload";

interface Section {
  heading: string;
  content: string;
  items: string; // textarea，一行一个
  image: string;
  imageAlt: string;
}

const CATEGORIES = ["comparison", "buying-guide", "troubleshooting", "maintenance", "product-showcase"];
const INTENTS = ["informational", "commercial", "transactional", "navigational"];
const CLUSTERS = [
  "Floor Scrubber Brushes",
  "Floor Scrubbers",
  "Squeegee Blades",
  "Pad Holders",
  "Clutch Plates",
  "Manufacturers & Suppliers",
  "Pricing & Logistics",
  "Maintenance & Support",
  "Applications",
];

export interface KeywordEntry {
  keyword: string;
  cluster: string;
  intent: string;
  businessValue: string;
  targetUrl: string;
  pageType: string;
  title?: string;
}

const EMPTY_SECTION: Section = { heading: "", content: "", items: "", image: "", imageAlt: "" };

const BFT = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-gray-700 mb-1">
        {label}
        {hint && <span className="text-gray-400 font-normal ml-2">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function ArticleEditor({ keywords }: { keywords: KeywordEntry[] }) {
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    category: "buying-guide",
    readTime: "8 min",
    difficulty: "beginner",
    thumbnail: "",
    published: new Date().toISOString().slice(0, 10),
    videoId: "",
    primaryKeyword: "",
    secondaryKeywords: "",
    searchIntent: "informational",
    cluster: "",
    relatedGuides: "",
    companyFacts: true,
  });
  const [sections, setSections] = useState<Section[]>([{ ...EMPTY_SECTION }]);
  const [result, setResult] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);

  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  // ── Step 1：选词 + 抢词检查 ──
  const [kwQuery, setKwQuery] = useState("");

  const kwMatches = useMemo(() => {
    const ql = kwQuery.trim().toLowerCase();
    if (!ql) return [];
    return keywords.filter((k) => k.keyword.toLowerCase().includes(ql)).slice(0, 8);
  }, [keywords, kwQuery]);

  // 抢词检查：当前 primaryKeyword 是否与库内已有页面冲突
  const cannibal = useMemo(() => {
    const input = (form.primaryKeyword || "").trim().toLowerCase();
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
      .slice(0, 5);
    return {
      scored,
      verdict: scored.some((x) => x.score >= 70) ? "high" : scored.length ? "medium" : "low",
    } as const;
  }, [keywords, form.primaryKeyword]);

  const pickKeyword = (k: KeywordEntry) => {
    setForm((f) => ({
      ...f,
      primaryKeyword: k.keyword,
      cluster: CLUSTERS.includes(k.cluster) ? k.cluster : f.cluster,
      searchIntent: k.intent,
      slug: f.slug || k.keyword.replace(/\s+/g, "-"),
    }));
    setKwQuery("");
  };

  // ── 实时检查（标准 checklist）──
  const report = useMemo(() => {
    const allText = sections.map((s) => `${s.heading} ${s.content} ${s.items}`).join(" ").toLowerCase();
    const itemsCount = sections.filter((s) => s.items.trim()).length;
    const faqCount = sections.filter((s) => s.heading.includes("?")).length;
    const primary = form.primaryKeyword.trim().toLowerCase();
    const primaryHits = primary ? (allText.split(primary).length - 1) : 0;
    const relatedCount = form.relatedGuides.split(",").map((s) => s.trim()).filter(Boolean).length;
    const hasNumbers = /\$[\d,]+|\d{3,}|\d+\s*(sqm|sq ft|countries|min|mm|inch)/i.test(allText);
    const hasCompanyFact = /2008|10,000|50\+|iso 9001|ce certified/i.test(allText);

    return {
      title: { ok: form.title.length > 0 && form.title.length <= 60, val: `${form.title.length}/60` },
      desc: { ok: form.description.length > 0 && form.description.length <= 160, val: `${form.description.length}/160` },
      slug: { ok: /^[a-z0-9]+(-[a-z0-9]+)*$/.test(form.slug), val: form.slug || "未填" },
      noEllipsis: { ok: !form.title.includes("...") && !form.description.includes("..."), val: "" },
      sections: { ok: sections.length >= 5, val: `${sections.length} 段（建议 ≥8）` },
      items: { ok: itemsCount >= 3, val: `${itemsCount} 个结构化块（GEO，≥3）` },
      primaryKeyword: { ok: primaryHits >= 3, val: `主词出现 ${primaryHits} 次（≥3）` },
      faq: { ok: faqCount >= 3, val: `${faqCount} 问（heading 含 ?，≥3）` },
      related: { ok: relatedCount === 3, val: `${relatedCount}/3 篇内链` },
      numbers: { ok: hasNumbers, val: hasNumbers ? "含具体数字" : "缺具体数字（价格/规格）" },
      companyFacts: { ok: hasCompanyFact, val: hasCompanyFact ? "含公司事实" : "缺公司事实（2008/10,000㎡/50+国/CE）" },
      intent: { ok: !!form.searchIntent, val: form.searchIntent },
      cluster: { ok: !!form.cluster, val: form.cluster || "未选集群" },
    };
  }, [form, sections]);

  const allOk = Object.values(report).every((r) => r.ok);
  const passCount = Object.values(report).filter((r) => r.ok).length;

  // ── 发布 ──
  const publish = async () => {
    setPublishing(true);
    setResult(null);
    try {
      const payload = {
        ...form,
        sections: sections.map((s) => ({
          heading: s.heading,
          content: s.content,
          items: s.items.split("\n").map((x) => x.trim()).filter(Boolean),
          image: s.image || undefined,
          imageAlt: s.imageAlt || undefined,
        })),
        secondaryKeywords: form.secondaryKeywords.split(",").map((s) => s.trim()).filter(Boolean),
        relatedGuides: form.relatedGuides.split(",").map((s) => s.trim()).filter(Boolean),
      };
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (e) {
      setResult("提交失败: " + String(e));
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      {/* ── 主表单 ── */}
      <div className="space-y-5">
        {/* ── Step 1：选关键词 + 抢词检查 ── */}
        <div className="bg-white rounded-xl border-2 border-primary/25 p-5">
          <h2 className="font-bold text-gray-900 mb-1">Step 1 — 选择关键词</h2>
          <p className="text-xs text-gray-500 mb-4">
            从 {keywords.length} 条关键词库选（点行即填），或直接输入新主词 → 立即抢词检查
          </p>

          <input
            className={BFT}
            value={kwQuery}
            onChange={(e) => setKwQuery(e.target.value)}
            placeholder="搜索关键词库，或直接输入新主词…"
          />

          {kwMatches.length > 0 && (
            <div className="mt-2 border border-gray-200 rounded-lg divide-y divide-gray-100 overflow-hidden">
              {kwMatches.map((k) => (
                <button
                  key={k.targetUrl + k.keyword}
                  type="button"
                  onClick={() => pickKeyword(k)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-3 text-sm"
                >
                  <span className="flex-1 text-gray-800">{k.keyword}</span>
                  <span className="text-xs text-gray-400">{k.cluster}</span>
                  <span className="text-xs text-gray-500">{k.intent}</span>
                  <span className="text-xs font-mono text-gray-400">{k.targetUrl}</span>
                </button>
              ))}
            </div>
          )}

          {/* 抢词检查结果 */}
          {cannibal && (
            <div className="mt-4">
              <div
                className={`rounded-lg p-3 text-xs border ${
                  cannibal.verdict === "high"
                    ? "bg-red-50 border-red-200 text-red-700"
                    : cannibal.verdict === "medium"
                    ? "bg-amber-50 border-amber-200 text-amber-700"
                    : "bg-green-50 border-green-200 text-green-700"
                }`}
              >
                {cannibal.verdict === "high" &&
                  "高风险：库内已有高度接近的关键词 → 优先复用现有 URL 扩写，不要新建同意图页面"}
                {cannibal.verdict === "medium" &&
                  "中等风险：存在部分重叠 → 确认新文章的搜索意图是否真的不同"}
                {cannibal.verdict === "low" && "低风险：未发现明显冲突，可以新建"}
              </div>
              {cannibal.scored.length > 0 && (
                <div className="mt-2 space-y-1">
                  {cannibal.scored.map(({ k, score }) => (
                    <div key={k.targetUrl + k.keyword} className="flex items-center gap-3 text-xs bg-gray-50 rounded px-3 py-1.5">
                      <span className="font-mono text-gray-400 w-9">{score}%</span>
                      <span className="flex-1 text-gray-700">{k.keyword}</span>
                      <a href={k.targetUrl} target="_blank" rel="noopener" className="text-accent hover:underline font-mono">
                        {k.targetUrl}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-bold text-gray-900 mb-4">Step 2 — 基础信息</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Title" hint="≤60 字符">
              <input className={BFT} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Top 10 ... 2026" />
            </Field>
            <Field label="Slug" hint="小写连字符">
              <input className={BFT} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="top-10-..." />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Description" hint="≤160 字符">
              <textarea rows={2} className={BFT} value={form.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <Field label="Category">
              <select className={BFT + " bg-white"} value={form.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Read Time">
              <input className={BFT} value={form.readTime} onChange={(e) => set("readTime", e.target.value)} />
            </Field>
            <Field label="Difficulty">
              <select className={BFT + " bg-white"} value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)}>
                {["beginner", "intermediate", "advanced"].map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Published">
              <input type="date" className={BFT} value={form.published} onChange={(e) => set("published", e.target.value)} />
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Field label="Thumbnail" hint="全站唯一">
              <input className={BFT} value={form.thumbnail} onChange={(e) => set("thumbnail", e.target.value)} placeholder="/images/xxx.webp" />
            </Field>
            <Field label="Video ID" hint="可选">
              <input className={BFT} value={form.videoId} onChange={(e) => set("videoId", e.target.value)} placeholder="factorytour01" />
            </Field>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-bold text-gray-900 mb-1">SEO / 关键词</h2>
          <p className="text-xs text-gray-500 mb-4">
            先到 <a href="/admin/keywords" target="_blank" className="text-accent underline">Keyword Map</a> 查抢词，再填这里
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Primary Keyword" hint="1 个">
              <input className={BFT} value={form.primaryKeyword} onChange={(e) => set("primaryKeyword", e.target.value)} />
            </Field>
            <Field label="Search Intent">
              <select className={BFT + " bg-white"} value={form.searchIntent} onChange={(e) => set("searchIntent", e.target.value)}>
                {INTENTS.map((i) => <option key={i}>{i}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Field label="Secondary Keywords" hint="逗号分隔">
              <input className={BFT} value={form.secondaryKeywords} onChange={(e) => set("secondaryKeywords", e.target.value)} />
            </Field>
            <Field label="Cluster">
              <select className={BFT + " bg-white"} value={form.cluster} onChange={(e) => set("cluster", e.target.value)}>
                <option value="">选择集群…</option>
                {CLUSTERS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Related Guides" hint="3 个 slug，逗号分隔">
              <input className={BFT} value={form.relatedGuides} onChange={(e) => set("relatedGuides", e.target.value)} placeholder="slug-a, slug-b, slug-c" />
            </Field>
          </div>
        </div>

        {/* Sections */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-gray-900">正文 Sections</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                heading 含 ? 的段落会自动成为 FAQ schema
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSections((s) => [...s, { ...EMPTY_SECTION }])}
              className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
            >
              + 添加段落
            </button>
          </div>

          <div className="space-y-4">
            {sections.map((s, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-500">段落 {i + 1}</span>
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setSections((arr) => arr.filter((_, x) => x !== i))}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      删除
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <input
                    className={BFT}
                    placeholder="Heading（问句会进 FAQ schema）"
                    value={s.heading}
                    onChange={(e) => setSections((arr) => arr.map((x, y) => (y === i ? { ...x, heading: e.target.value } : x)))}
                  />
                  <textarea
                    rows={3}
                    className={BFT}
                    placeholder="Content（2-4 句，含具体数字/事实）"
                    value={s.content}
                    onChange={(e) => setSections((arr) => arr.map((x, y) => (y === i ? { ...x, content: e.target.value } : x)))}
                  />
                  <textarea
                    rows={2}
                    className={BFT + " font-mono text-xs"}
                    placeholder="Items（GEO 结构化要点，一行一个）"
                    value={s.items}
                    onChange={(e) => setSections((arr) => arr.map((x, y) => (y === i ? { ...x, items: e.target.value } : x)))}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className={BFT}
                      placeholder="Image 路径（可选）"
                      value={s.image}
                      onChange={(e) => setSections((arr) => arr.map((x, y) => (y === i ? { ...x, image: e.target.value } : x)))}
                    />
                    <input
                      className={BFT}
                      placeholder="Image Alt（可选）"
                      value={s.imageAlt}
                      onChange={(e) => setSections((arr) => arr.map((x, y) => (y === i ? { ...x, imageAlt: e.target.value } : x)))}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 右侧：参考资料 + 检查器 ── */}
      <div className="lg:sticky lg:top-4 h-fit space-y-4">
        <ReferenceUpload />

        <div className="bg-white rounded-xl border-2 border-accent/30 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900">发布前检查</h2>
            <span className={`text-sm font-bold ${allOk ? "text-green-600" : "text-amber-600"}`}>
              {passCount}/{Object.keys(report).length}
            </span>
          </div>
          <ul className="space-y-2">
            {Object.entries(report).map(([k, v]) => (
              <li key={k} className="flex items-start gap-2 text-xs">
                <span className={v.ok ? "text-green-500" : "text-amber-500"}>{v.ok ? "✓" : "○"}</span>
                <span className="flex-1 text-gray-700">{k}</span>
                {v.val && <span className="text-gray-400 font-mono">{v.val}</span>}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={publish}
          disabled={publishing || !form.slug || !form.title}
          className="w-full py-3.5 bg-accent hover:bg-accent-hover disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors"
        >
          {publishing ? "发布中…" : "发布文章"}
        </button>
        <p className="text-xs text-gray-500 text-center">
          配置了 GitHub token 则自动提交并部署；否则返回代码供复制
        </p>

        {result && (
          <div className="bg-gray-900 text-gray-100 rounded-xl p-4 text-xs overflow-auto max-h-96">
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
