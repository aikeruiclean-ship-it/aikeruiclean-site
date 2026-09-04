"use client";

import { Phone } from "@/lib/icons";

const MAIN_WHATSAPP = "8619965236428";

export function WhatsAppHeroButton() {
  const phone = MAIN_WHATSAPP;

  return (
    <a
      href={`https://api.whatsapp.com/send?phone=${phone}&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing.`}
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-base"
    >
      <Phone size={16} />
      WhatsApp
    </a>
  );
}
