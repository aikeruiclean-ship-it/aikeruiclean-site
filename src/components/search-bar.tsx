"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, X } from "@/lib/icons";
import { getProducts } from "@/lib/products";
import type { Product } from "@/lib/products";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const matches = getProducts()
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 6);
    setResults(matches);
    setOpen(matches.length > 0);
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center bg-gray-100 rounded-lg border border-transparent focus-within:border-primary focus-within:bg-white transition-colors">
        <Search size={16} className="ml-2.5 text-gray-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="w-40 lg:w-52 px-2 py-2 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
        />
        {query && (
          <button onClick={() => { setQuery(""); setResults([]); setOpen(false); }} className="mr-1 p-1 text-gray-400 hover:text-gray-600">
            <X size={14} />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full right-0 mt-1 w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
          <div className="p-2 space-y-0.5">
            {results.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                onClick={() => { setOpen(false); setQuery(""); }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                  {p.images[0] ? (
                    <img src={p.images[0]} alt="" className="w-full h-full object-contain p-1" />
                  ) : (
                    <Search size={16} className="text-gray-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-500 truncate">{p.category} · {p.sku}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href={`/products?q=${encodeURIComponent(query)}`}
            onClick={() => { setOpen(false); setQuery(""); }}
            className="block px-4 py-2.5 text-center text-sm text-primary font-medium border-t border-gray-100 hover:bg-gray-50 transition-colors"
          >
            View all results for &quot;{query}&quot;
          </Link>
        </div>
      )}
    </div>
  );
}
