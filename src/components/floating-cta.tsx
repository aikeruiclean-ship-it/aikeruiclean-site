"use client";

import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href="https://api.whatsapp.com/send?phone=8619965236428&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all animate-pulse hover:animate-none"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline text-sm">Chat Now</span>
      </a>

      {/* Quote */}
      <Link
        href="/floor-scrubber-parts-quote"
        className="flex items-center gap-2 px-4 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <Send size={18} />
        <span className="hidden sm:inline text-sm">Get Quote</span>
      </Link>
    </div>
  );
}
