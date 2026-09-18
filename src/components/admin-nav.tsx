"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  {
    group: "内容生产",
    items: [
      { href: "/admin/keywords", label: "Keyword Map", desc: "关键词库 + 抢词检查" },
      { href: "/admin/articles", label: "Article Workbench", desc: "写文章 + 12 项检查 + 发布" },
    ],
  },
  {
    group: "数据分析",
    items: [
      { href: "/admin/performance", label: "Performance Loop", desc: "GSC 数据闭环" },
      { href: "/admin/content-audit", label: "Content Audit", desc: "缺口 + 内链审计" },
    ],
  },
  {
    group: "客户运营",
    items: [
      { href: "/admin/leads", label: "Leads", desc: "询盘记录" },
      { href: "/admin/reviews", label: "Reviews", desc: "评价审核" },
      { href: "/admin/whatsapp", label: "WhatsApp Clicks", desc: "点击追踪" },
    ],
  },
];

export function AdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 移动端顶栏 */}
      <div className="lg:hidden sticky top-0 z-30 bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="font-bold">
          Aikerui 后台
        </Link>
        <button onClick={() => setOpen(!open)} className="text-sm px-3 py-1 border border-white/30 rounded">
          {open ? "关闭" : "菜单"}
        </button>
      </div>

      <aside className={`${open ? "block" : "hidden"} lg:block lg:fixed lg:inset-y-0 lg:w-64 bg-gray-900 text-white overflow-y-auto`}>
        <div className="p-5 hidden lg:block">
          <Link href="/admin" className="text-lg font-bold">
            Aikerui 后台
          </Link>
          <p className="text-xs text-gray-400 mt-1">独立站运营控制台</p>
        </div>

        <nav className="px-3 pb-8">
          <Link
            href="/admin"
            className={`block px-3 py-2 mb-3 rounded-lg text-sm font-semibold transition-colors ${
              pathname === "/admin" ? "bg-primary text-white" : "text-gray-300 hover:bg-white/10"
            }`}
          >
            概览
          </Link>

          {NAV.map((g) => (
            <div key={g.group} className="mb-4">
              <div className="px-3 py-1.5 text-[11px] uppercase tracking-wider text-gray-500 font-semibold">{g.group}</div>
              {g.items.map((it) => {
                const active = pathname === it.href || pathname.startsWith(it.href + "/");
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded-lg transition-colors ${active ? "bg-primary text-white" : "text-gray-300 hover:bg-white/10"}`}
                  >
                    <div className="text-sm font-medium">{it.label}</div>
                    <div className={`text-[11px] ${active ? "text-white/70" : "text-gray-500"}`}>{it.desc}</div>
                  </Link>
                );
              })}
            </div>
          ))}

          <div className="border-t border-white/10 pt-4 mt-2">
            <Link href="/" target="_blank" className="block px-3 py-2 text-xs text-gray-400 hover:text-white">
              ↗ 打开网站前台
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
