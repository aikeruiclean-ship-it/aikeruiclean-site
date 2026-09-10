"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe, ChevronDown } from "@/lib/icons";
import { locales, localeNames, type Locale } from "@/i18n/config";

// Language switcher — detects current locale from the pathname.
// English lives at root (/products/...), other locales at /es/products/...
function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : "en";
}

// Strip a leading locale segment to get the "base" path
function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if ((locales as readonly string[]).includes(seg)) {
    const rest = pathname.slice(seg.length + 1);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname;
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname() || "/";
  const current = getLocaleFromPath(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const base = stripLocale(pathname);

  // Only offer locales that have translated pages (en + the 4 others)
  const options = locales;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 hover:text-primary transition-colors"
      >
        <Globe size={16} />
        {!compact && <span className="hidden sm:inline">{localeNames[current]}</span>}
        <ChevronDown size={14} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
          {options.map((loc) => {
            // 英文回到当前英语路径；其他语言目前只有首页已翻译 → 指向外语首页
            const href = loc === "en" ? base : `/${loc}`;
            return (
              <Link
                key={loc}
                href={href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-sm transition-colors ${
                  loc === current ? "bg-gray-50 text-primary font-semibold" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {localeNames[loc]}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
