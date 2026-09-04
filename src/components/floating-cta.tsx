"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Send } from "@/lib/icons";
import { getOrPickPerson, type SalesPerson } from "@/lib/sales-team";

export function FloatingCTA() {
  const [person, setPerson] = useState<SalesPerson | null>(null);

  useEffect(() => {
    setPerson(getOrPickPerson());
  }, []);

  const phone = person?.phone ?? "8619965236428";
  const name = person?.name ?? "Keke";

  const handleWhatsAppClick = () => {
    // Track the click before opening WhatsApp
    try {
      fetch("/api/whatsapp-track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salesName: name,
          salesPhone: phone,
          page: window.location.pathname,
          referrer: document.referrer || "",
        }),
      }).catch(() => {});
    } catch {}
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?phone=${phone}&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing.`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all animate-pulse hover:animate-none"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline text-sm">
          Chat{name ? ` — ${name}` : " Now"}
        </span>
      </a>

      {/* Quote */}
      <Link
        href="/floor-scrubber-parts-quote"
        aria-label="Get a quote"
        className="flex items-center gap-2 px-4 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <Send size={18} />
        <span className="hidden sm:inline text-sm">Get Quote</span>
      </Link>
    </div>
  );
}
