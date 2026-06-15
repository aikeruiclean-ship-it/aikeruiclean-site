import Link from "next/link";
import Image from "next/image";
import { Shield, Award, Globe, CheckCircle, Factory, ArrowRight, Search, Phone, Video, Camera, Building2, Users, Truck } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, ABOUT_BREADCRUMB } from "@/lib/breadcrumb";

const factoryImages = [
  { src: "/images/factory/1.jpg", alt: "Aikerui factory entrance - real manufacturer", label: "Factory Entrance" },
  { src: "/images/factory/2.jpg", alt: "Aikerui production line", label: "Production Workshop" },
  { src: "/images/factory/3.jpg", alt: "Aikerui assembly line", label: "Assembly Line" },
  { src: "/images/factory/5.jpg", alt: "Aikerui quality control", label: "Quality Control" },
  { src: "/images/factory/_MG_3280.JPG", alt: "Aikerui CNC workshop", label: "CNC Workshop" },
  { src: "/images/factory/_MG_3285.JPG", alt: "Aikerui warehouse", label: "Warehouse & Inventory" },
];

export default function AboutPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd(ABOUT_BREADCRUMB)} />

      {/* ===== HERO ===== */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <Image src="/images/factory/_MG_3302.JPG" alt="Aikerui real factory" fill className="object-cover" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-accent/90 text-white text-sm font-semibold rounded-full mb-4">✅ Verified Manufacturer — Since 2015</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Worried About <span className="text-accent">Fake Factories</span>?<br />
                We <span className="text-accent">Own</span> Ours.
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed">
                Not a trading company. Not a middleman. Aikerui is a real manufacturer with our own 10,000+㎡ factory in Hefei, China. You can verify, visit, or video call us anytime.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors">
                  <Video size={18} /> Request a Video Factory Tour
                </Link>
                <Link href="#verify" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors">
                  How to Verify Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Building2, text: "10,000+㎡ Own Factory" },
              { icon: Users, text: "50+ On-Site Workers" },
              { icon: Award, text: "CE & ISO Certified" },
              { icon: Truck, text: "Exported to 50+ Countries" },
            ].map((item) => (
              <div key={item.text} className="flex items-center justify-center gap-2 py-2">
                <item.icon size={20} className="text-primary shrink-0" />
                <span className="text-sm font-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW TO VERIFY US ===== */}
      <section id="verify" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">No More Doubts</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">How to Verify We Are a Real Factory</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We understand—too many middlemen claim to be "factory direct." Here are 5 ways you can confirm we are the real manufacturer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Video, title: "1. Live Video Call", desc: "Schedule a WhatsApp/WeChat video call. We'll walk you through our production line, assembly workshop, and warehouse — in real time.", cta: "Request a Video Call", color: "bg-red-50 border-red-200" },
              { icon: Camera, title: "2. Request Custom Photos", desc: "Ask us to take a photo with today's date and your name on a sign next to any machine or workshop. We'll send it within 24 hours.", cta: "Request Photo Proof", color: "bg-blue-50 border-blue-200" },
              { icon: Search, title: "3. Third-Party Inspection", desc: "We welcome SGS, Bureau Veritas, or any inspection agency you appoint. Inspection reports shared directly with you.", cta: "Arrange Inspection", color: "bg-green-50 border-green-200" },
            ].map((item) => (
              <div key={item.title} className={`p-6 rounded-xl border ${item.color}`}>
                <item.icon size={32} className="text-primary mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                <Link href="/contact" className="text-sm font-semibold text-primary hover:text-primary-light transition-colors">{item.cta} →</Link>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {[
              { icon: Globe, title: "4. Check Our Export Records", desc: "We provide customs documentation, bill of lading, and shipping records upon request. Real factories export regularly — not once a year." },
              { icon: Phone, title: "5. Call Us Directly", desc: "Reach our factory floor at +86 199 6523 6428. Ask for our engineering or production team — not a salesperson. We have nothing to hide." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-gray-200 bg-white">
                <div className="flex items-start gap-4">
                  <item.icon size={28} className="text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FACTORY VS TRADING COMPANY ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Real Factory vs. Trading Company</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Many suppliers say "factory direct" — but how can you tell? Here is the difference.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-4 font-semibold text-gray-900 w-1/3"></th>
                  <th className="text-center px-6 py-4 font-semibold text-green-700 bg-green-50">✅ Real Factory (Aikerui)</th>
                  <th className="text-center px-6 py-4 font-semibold text-red-700 bg-red-50">❌ Trading Company</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Owns production facility", "✅ 10,000+㎡ factory in Hefei", "❌ No factory — sources from others"],
                  ["Manufactures products", "✅ Full in-house production line", "❌ Only buys and resells"],
                  ["Shows factory floor", "✅ Real-time video walkthrough available", "❌ Stock photos or borrowed factory images"],
                  ["R&D capability", "✅ 15+ in-house engineers", "❌ No engineering team"],
                  ["Inventory on site", "✅ 50+ machines & 360+ parts in stock", "❌ Limited or no inventory"],
                  ["Accepts factory visit", "✅ Anytime — we welcome visitors", "❌ Makes excuses or delays"],
                  ["Knows technical specs", "✅ Our engineers designed every part", "❌ Reads from a spec sheet"],
                  ["After-sales support", "✅ Direct support from factory engineers", "❌ Limited or no support"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-6 py-3.5 font-medium text-gray-900 border-t border-gray-100">{row[0]}</td>
                    <td className="px-6 py-3.5 text-center text-green-700 border-t border-gray-100">{row[1]}</td>
                    <td className="px-6 py-3.5 text-center text-red-600 border-t border-gray-100">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== FACTORY GALLERY ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Camera size={32} className="mx-auto text-primary mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Real Photos from Our Factory</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">These are actual photos taken at our facility. Request a live video tour to see more.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {factoryImages.map((img, i) => (
              <div key={i} className={`relative rounded-xl overflow-hidden group ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`} style={{ minHeight: i === 0 ? "400px" : "200px" }}>
                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white text-sm font-medium drop-shadow-lg">{img.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY BUY DIRECT ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Buying Direct Means for You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">When you buy from the real factory, you don't just save money — you gain a partner.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Factory, title: "Pay Factory Price, Not Middleman Price", desc: "Trading companies mark up 20–40%. We skip the middleman entirely. You get the same price as our domestic distributors.", tag: "Save 20-40%" },
              { icon: Shield, title: "Full Quality Control, No Surprises", desc: "We test every machine before shipment. Brush pressure, water recovery, battery cycle — if it fails, it doesn't ship.", tag: "CE & ISO Certified" },
              { icon: Globe, title: "Direct Support, Not a Call Center", desc: "When you need help, you talk to our engineers — not a sales rep who reads from a script. Spare parts shipped within 24 hours.", tag: "Direct Engineer Support" },
            ].map((item) => (
              <div key={item.title} className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6"><item.icon size={28} className="text-primary" /></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {
      {/* ===== CUSTOMER SUCCESS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Real Customers, Real Success</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We have shipped to distributors, rental companies, and facility managers in 50+ countries. Here are some of our recent deliveries.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["28603cdc-32de-4edd-8e0b-ad2698cf6a1a","29f8cd15-b922-4581-8ba2-da456f26b3d3","87ef49e0-96c1-4040-8ce8-bd871b11f397","91627666-cd88-4b8c-8e13-bf0f33bf4bf6","a71ae593-fbc6-4e36-944f-e553c95d2859","d707642a-5e6a-4c6b-a21d-08ab584fa7d5","e406f60f-222d-4333-8bec-3c61fe7bc09b"].map((id) => (
              <div key={id} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <Image src={`/images/testimonials/${id}.jpg`} alt="Aikerui customer delivery photo" fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="200px" />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-light transition-colors">
              Join Our 2000+ Satisfied Customers <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      /* ===== DOUBTS FAQ ===== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Still Have Doubts? Here Are Honest Answers.</h2>
          <div className="space-y-4">
            {[
              { q: "How do I know you won't take my money and disappear?", a: "We've been in business since 2015. Our company is registered under Aikerui Cleaning Technology Co., Ltd. in Hefei, Anhui. You can verify our business license, visit our factory, or check our export records with customs. We accept T/T, PayPal, and L/C — we're not going anywhere." },
              { q: "Can I visit your factory before ordering?", a: "Absolutely. We welcome factory visits. We're located in Hefei City, Anhui Province — about 2 hours from Shanghai by high-speed rail. We can arrange airport pickup and a factory tour. No appointment needed, but advance notice helps us prepare." },
              { q: "What if the machine arrives damaged or defective?", a: "Every machine is fully tested before shipment and professionally packed for export. In the unlikely event of damage during transit, we'll work with you to resolve it — replacement parts shipped immediately or a discount on your next order." },
              { q: "Do you have other buyers I can contact for reference?", a: "Yes. We can provide references from our existing clients in your region upon request. We serve distributors, rental companies, and facility managers in 50+ countries." },
              { q: "What's your minimum order quantity?", a: "For standard models, MOQ is 1 unit for sampling. For wholesale, 2–5 units per model is recommended to optimize shipping costs. OEM orders require 10+ units per model." },
            ].map((item, i) => (
              <details key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
                <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <span>{item.q}</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATIONS ===== */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">Third-Party Verified</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["CE Certified", "ISO 9001", "SGS Verified", "RoHS Compliant"].map((cert) => (
              <div key={cert} className="flex items-center gap-2 px-5 py-3 bg-gray-50 rounded-xl border border-gray-200">
                <CheckCircle size={20} className="text-green-600" />
                <span className="font-semibold text-gray-900 text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"><Image src="/images/factory/_MG_3307.JPG" alt="" fill className="object-cover" /></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Video size={48} className="mx-auto mb-6 text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let Us Prove It — Live Video Tour</h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            No stock photos. No scripts. Schedule a WhatsApp/WeChat video call and we'll walk you through our factory floor in real time. See the machines, meet the team, inspect the quality — all from your phone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors text-lg">
              <Video size={20} /> Schedule a Live Video Tour
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors">
              Browse Products
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-6">Or call us directly: <a href="tel:+8619965236428" className="text-white underline">+86 199 6523 6428</a></p>
        </div>
      </section>
    </div>
  );
}
