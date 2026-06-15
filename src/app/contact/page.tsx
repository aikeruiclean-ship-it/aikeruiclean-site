"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Video, Factory, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, CONTACT_BREADCRUMB } from "@/lib/breadcrumb";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", country: "", product: "", quantity: "", message: "", wantVideoTour: false });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, message: formData.wantVideoTour ? `[REQUEST VIDEO TOUR] ${formData.message}` : formData.message }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      alert("Failed to send. Please email us directly at info@aikeruiclean.com");
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setFormData((prev) => ({ ...prev, [target.name]: value }));
  };

  return (
    <div>
      <JsonLd data={breadcrumbJsonLd(CONTACT_BREADCRUMB)} />

      {/* Header */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact the Factory Directly</h1>
          <p className="text-gray-200 text-lg">No middlemen. No sales agents. Talk directly to the manufacturer.</p>
        </div>
      </section>

      {/* Quick Contact Strip */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="tel:+8619965236428" className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors group">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shrink-0"><Phone size={22} className="text-white" /></div>
              <div><p className="text-xs text-green-700 font-medium uppercase">Call Factory Direct</p><p className="text-sm font-bold text-gray-900 group-hover:text-green-700">+86 199 6523 6428</p></div>
            </a>
            <a href="mailto:info@aikeruiclean.com" className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors group">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0"><Mail size={22} className="text-white" /></div>
              <div><p className="text-xs text-blue-700 font-medium uppercase">Email Us</p><p className="text-sm font-bold text-gray-900 group-hover:text-blue-700">info@aikeruiclean.com</p></div>
            </a>
            <Link href="/about#verify" className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors group">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shrink-0"><Video size={22} className="text-white" /></div>
              <div><p className="text-xs text-purple-700 font-medium uppercase">Schedule Video Tour</p><p className="text-sm font-bold text-gray-900 group-hover:text-purple-700">See Our Factory Live →</p></div>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Our Factory Team</h2>
              <p className="text-sm text-gray-600 leading-relaxed">We respond to all inquiries within 24 hours. For urgent needs, call us directly — you will speak to our team on the factory floor.</p>
            </div>

            <div className="space-y-5">
              {[
                { icon: Factory, label: "Factory Address", value: "No. 058, Yuantan Road, Yuantan Town, Qianshan City, Anqing City, Anhui Province, China" },
                { icon: Phone, label: "Phone (Factory Direct)", value: "+86 199 6523 6428", href: "tel:+8619965236428", highlight: true },
                { icon: MessageCircle, label: "WhatsApp / WeChat", value: "+86 199 6523 6428", href: "https://wa.me/8619965236428" },
                { icon: Mail, label: "Email", value: "info@aikeruiclean.com", href: "mailto:info@aikeruiclean.com" },
                { icon: Clock, label: "Working Hours", value: "Mon–Fri: 8:30 AM – 6:00 PM (CST)" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.highlight ? "bg-green-100" : "bg-primary/10"}`}>
                    <item.icon size={20} className={item.highlight ? "text-green-600" : "text-primary"} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className={`text-sm ${item.highlight ? "text-green-700 font-bold text-base" : "text-gray-900"} hover:text-primary transition-colors`}>{item.value}</a>
                    ) : (
                      <p className="text-sm text-gray-900">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Factory Image */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
              <Image src="/images/factory/_MG_3304.JPG" alt="Aikerui factory" fill className="object-cover" sizes="400px" />
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-xs font-semibold text-amber-800 uppercase">Want to Verify Us?</p>
              <p className="text-sm text-amber-700 mt-1">We welcome third-party inspections and live video tours. <Link href="/about#verify" className="underline font-medium">Learn how →</Link></p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="p-8 bg-green-50 rounded-xl border border-green-200 text-center">
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Inquiry Submitted Successfully!</h3>
                <p className="text-gray-600 mb-2">Thank you for contacting Aikerui. Our team will respond within 24 hours.</p>
                {formData.wantVideoTour && <p className="text-sm text-primary font-semibold mb-4">We will contact you to arrange a live factory video tour.</p>}
                <p className="text-sm text-gray-500 mb-6">For urgent inquiries, call us directly: <a href="tel:+8619965236428" className="text-primary font-bold">+86 199 6523 6428</a></p>
                <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", company: "", country: "", product: "", quantity: "", message: "", wantVideoTour: false }); }}
                  className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-light transition-colors">Send Another Inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Include country code" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Company name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Your country" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Interested In</label>
                    <input type="text" name="product" value={formData.product} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="e.g. K500BT Floor Scrubber" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Needed</label>
                    <select name="quantity" value={formData.quantity} onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                      <option value="">Select</option>
                      <option value="1">1 (Sample/Test)</option>
                      <option value="2-5">2–5 (Small batch)</option>
                      <option value="6-20">6–20 (Medium)</option>
                      <option value="21+">21+ (Wholesale)</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors w-full">
                      <input type="checkbox" name="wantVideoTour" checked={formData.wantVideoTour} onChange={handleChange} className="w-4 h-4 text-purple-600" />
                      <div><p className="text-sm font-medium text-purple-900">I want a live video factory tour</p><p className="text-xs text-purple-700">We'll show you our production line via WhatsApp/WeChat</p></div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea name="message" required rows={5} value={formData.message} onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                    placeholder="Tell us about your requirements, application, facility size, and any specific questions..." />
                </div>

                <button type="submit" disabled={sending}
                  className="w-full flex items-center justify-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors text-base">
                  {sending ? (
                    <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Sending...</span>
                  ) : (<><Send size={18} /> Send Inquiry Direct to Factory</>)}
                </button>
                <p className="text-xs text-center text-gray-400">Your information is kept confidential. We will only use it to respond to your inquiry.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
