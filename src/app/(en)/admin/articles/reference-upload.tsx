"use client";

import { useState } from "react";

interface RefDoc {
  name: string;
  size: number;
  kind: string;
  text: string;
  error?: string;
}

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const fmtSize = (b: number) => (b < 1024 ? b + " B" : b < 1048576 ? (b / 1024).toFixed(1) + " KB" : (b / 1048576).toFixed(1) + " MB");

/** 按扩展名解析为纯文本 */
async function parseFile(f: File): Promise<RefDoc> {
  const ext = (f.name.split(".").pop() || "").toLowerCase();
  const base = { name: f.name, size: f.size, kind: ext.toUpperCase(), text: "" };

  if (f.size > MAX_SIZE) return { ...base, error: "文件超过 5MB，请裁剪后再上传" };

  // 纯文本类
  if (["txt", "md", "csv", "tsv", "json"].includes(ext)) {
    return { ...base, text: await f.text() };
  }

  // Excel
  if (ext === "xlsx" || ext === "xls") {
    try {
      const XLSX = await import("xlsx");
      const buf = await f.arrayBuffer();
      const wb = XLSX.read(buf);
      const parts = wb.SheetNames.map(
        (n) => `=== Sheet: ${n} ===\n` + XLSX.utils.sheet_to_csv(wb.Sheets[n])
      );
      return { ...base, text: parts.join("\n\n") };
    } catch (e) {
      return { ...base, error: "Excel 解析失败: " + String(e) };
    }
  }

  // Word .docx
  if (ext === "docx") {
    try {
      const mammoth: any = await import("mammoth");
      const buf = await f.arrayBuffer();
      const r = await mammoth.extractRawText({ arrayBuffer: buf });
      return { ...base, text: r.value || "(文档无文本内容)" };
    } catch (e) {
      return { ...base, error: "Word 解析失败: " + String(e) };
    }
  }

  // 不支持的格式
  return {
    ...base,
    error: `.${ext} 暂不支持 —— 请另存为 .csv / .xlsx / .docx / .txt 后重试`,
  };
}

export function ReferenceUpload() {
  const [docs, setDocs] = useState<RefDoc[]>([]);
  const [busy, setBusy] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    const parsed: RefDoc[] = [];
    for (const f of Array.from(files)) {
      parsed.push(await parseFile(f));
    }
    setDocs((d) => [...d, ...parsed]);
    setOpenIdx(docs.length); // 展开第一个新上传的
    setBusy(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-gray-900 text-sm">参考资料</h2>
        {docs.length > 0 && (
          <button type="button" onClick={() => { setDocs([]); setOpenIdx(null); }} className="text-xs text-gray-400 hover:text-red-500">
            清空
          </button>
        )}
      </div>
      <p className="text-xs text-gray-500 mb-3">
        上传 Semrush 导出或竞品资料（.csv / .xlsx / .docx / .txt / .md）—— 解析成文本供写作对照
      </p>

      <label className="block">
        <input
          type="file"
          multiple
          accept=".csv,.xlsx,.xls,.docx,.txt,.md,.tsv,.json"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
        <span className="block w-full text-center py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-xs text-gray-600 cursor-pointer hover:border-accent hover:text-accent transition-colors">
          {busy ? "解析中…" : "+ 选择文件（可多选）"}
        </span>
      </label>

      {docs.length > 0 && (
        <div className="mt-3 space-y-2">
          {docs.map((d, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-gray-50"
              >
                <span className="text-xs">{d.error ? "⚠️" : "📄"}</span>
                <span className="flex-1 text-xs text-gray-800 truncate">{d.name}</span>
                <span className="text-[10px] text-gray-400">{d.kind} · {fmtSize(d.size)}</span>
                <span className="text-[10px] text-gray-400">{openIdx === i ? "收起" : "查看"}</span>
              </button>
              {d.error && (
                <p className="px-3 pb-2 text-[11px] text-red-500">{d.error}</p>
              )}
              {openIdx === i && !d.error && (
                <pre className="px-3 pb-3 text-[11px] text-gray-600 whitespace-pre-wrap max-h-72 overflow-auto bg-gray-50">
                  {d.text.slice(0, 20000) || "(空)"}
                  {d.text.length > 20000 && "\n\n…（已截断，仅显示前 20000 字符）"}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
