"use client";

import { useState } from "react";
import { InquiryModal } from "@/components/inquiry-modal";

export function InquiryButton({ productName }: { productName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors text-base"
      >
        Inquire About This Product
      </button>
      <InquiryModal isOpen={open} onClose={() => setOpen(false)} productName={productName} />
    </>
  );
}
