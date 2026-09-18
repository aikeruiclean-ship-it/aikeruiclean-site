"use client";

import { useState, useEffect } from "react";
import { Send, Phone, CheckCircle } from "@/lib/icons";
import { persistAttribution, attachAttribution } from "@/lib/attribution";

const AW_CONVERSION = "AW-18359776225/AKHbCP6CodwcEOHnz7JE";
const PRODUCT_LABEL = "Floor Scrubber Brush (Ad Landing)";

/**
 * Brush 专属落地页询价表单（Google Ads 用）
 * - 采集 gclid/utm（persistAttribution + attachAttribution）
 * - 提交后触发 Google Ads 转化（GTM dataLayer + gtag 双通道 + 轮询兜底）
 */
export function BrushQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    machineModel: "",
    brushType: "",
    quantity: "",
    message: "",
  });

  useEffect(() => {
    persistAttribution();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const body = attachAttribution({ ...form, product: PRODUCT_LABEL });
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);

      // ── Google Ads conversion（增强型转化 + 双通道 + 兜底）──
      if (typeof window !== "undefined") {
        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({ event: "quote_submit", product: PRODUCT_LABEL });
        w.dataLayer.push(["event", "conversion", { send_to: AW_CONVERSION }]);

        // Ads 后台已启用「增强型转化」→ 必须发送用户数据，否则匹配率低、可能显示未检测到
        // （gtag 会自动 SHA-256 哈希，无需自行处理）
        const sendUserData = () => {
          const email = String(form.email || "").trim().toLowerCase();
          const phone = String(form.phone || "").replace(/[^\d+]/g, "");
          if (email || phone) {
            w.gtag("set", "user_data", {
              ...(email ? { email } : {}),
              ...(phone ? { phone_number: phone } : {}),
            });
          }
        };

        const fire = () => {
          if (typeof w.gtag === "function") {
            sendUserData();
            w.gtag("event", "conversion", { send_to: AW_CONVERSION });
          }
        };
        fire();
        if (typeof w.gtag !== "function") {
          let tries = 0;
          const retry = setInterval(() => {
            tries++;
            if (typeof w.gtag === "function") {
              clearInterval(retry);
              sendUserData();
              w.gtag("event", "conversion", { send_to: AW_CONVERSION });
            } else if (tries >= 15) {
              clearInterval(retry);
            }
          }, 200);
        }
      }
    } catch {
      alert("Something went wrong. Please WhatsApp us: +86 199 6523 6428");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border-2 border-green-200 p-8 text-center shadow-lg">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600" size={28} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Request Received</h3>
        <p className="text-gray-600 mb-1">We will reply with brush pricing within 24 hours.</p>
        <p className="text-sm text-gray-500">
          Urgent? WhatsApp{" "}
          <a href="https://wa.me/8619965236428" className="text-accent font-semibold" target="_blank" rel="noopener">
            +86 199 6523 6428
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-7 shadow-lg">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">Get Brush Pricing in 24 Hours</h2>
        <p className="text-sm text-gray-500 mt-1">Free samples available. OEM &amp; custom sizes welcome.</p>
      </div>

      <div className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <input
            type="text"
            required
            placeholder="Your name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent"
          />
          <input
            type="email"
            required
            placeholder="Business email *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <input
            type="text"
            placeholder="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent"
          />
          <input
            type="text"
            placeholder="Phone / WhatsApp"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <select
            value={form.brushType}
            onChange={(e) => setForm({ ...form, brushType: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent bg-white"
          >
            <option value="">Brush type…</option>
            <option value="Disc brush">Disc brush</option>
            <option value="Roller / cylindrical brush">Roller / cylindrical brush</option>
            <option value="Side brush">Side brush</option>
            <option value="Squeegee / other parts">Squeegee / other parts</option>
            <option value="Not sure — please advise">Not sure — please advise</option>
          </select>
          <input
            type="text"
            placeholder="Quantity (e.g. 50 pcs)"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent"
          />
        </div>

        <input
          type="text"
          placeholder="Machine brand & model (e.g. Tennant T300, Nilfisk SC250)"
          value={form.machineModel}
          onChange={(e) => setForm({ ...form, machineModel: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent"
        />

        <textarea
          rows={3}
          placeholder="Anything else? (dimensions, bristle material, floor type…)"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-accent resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="w-full mt-5 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-bold rounded-lg transition-colors"
      >
        <Send size={18} />
        {sending ? "Sending…" : "Get Factory Price"}
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        No spam. We reply within 24 hours with pricing and compatibility confirmation.
      </p>

      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <a
          href="https://wa.me/8619965236428"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700"
        >
          <Phone size={15} /> Or WhatsApp us: +86 199 6523 6428
        </a>
      </div>
    </form>
  );
}
