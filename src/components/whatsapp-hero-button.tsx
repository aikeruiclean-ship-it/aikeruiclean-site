"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { getOrPickPerson, type SalesPerson } from "@/lib/sales-team";

export function WhatsAppHeroButton() {
  const [person, setPerson] = useState<SalesPerson | null>(null);

  useEffect(() => {
    setPerson(getOrPickPerson());
  }, []);

  const phone = person?.phone ?? "8619159116875";
  const name = person?.name ?? "Keke";

  return (
    <a
      href={`https://api.whatsapp.com/send?phone=${phone}&text=Hi%2C%20I%27m%20interested%20in%20floor%20scrubber%20pricing.`}
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-base"
    >
      <Phone size={16} />
      WhatsApp{name ? ` ${name}` : ""}
    </a>
  );
}
