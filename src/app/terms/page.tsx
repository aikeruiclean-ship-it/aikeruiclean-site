import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/breadcrumb";

const TERMS_BREADCRUMB = [
  { name: "Home", item: "/" },
  { name: "Terms & Conditions", item: "/terms" },
];

export const metadata = {
  title: "Terms & Conditions | Anhui Aikerui Environmental Protection Technology CO.,LTD",
  description: "Terms and conditions for purchasing from Aikerui. Includes ordering, payment, shipping, warranty, and return policies.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <JsonLd data={breadcrumbJsonLd(TERMS_BREADCRUMB)} />

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: June 17, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <h2 className="text-xl font-bold text-gray-900 mt-8">1. Company Information</h2>
        <p>
          Anhui Aikerui Environmental Protection Technology CO.,LTD<br />
          No. 058, Yuantan Road, Yuantan Town, Qianshan City, Anqing City, Anhui Province, China<br />
          Email: info@aikeruiclean.com<br />
          Phone: +86 199 6523 6428
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">2. Products and Orders</h2>
        <p>All product specifications, pricing, and availability are subject to change without notice. Orders are confirmed upon receipt of deposit or full payment. We reserve the right to refuse or cancel any order.</p>
        <p>Custom/OEM orders require written specification agreement before production begins.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">3. Pricing and Payment</h2>
        <p>All prices are in USD unless otherwise stated. Prices quoted are EXW (Ex Works) — factory door pricing. Shipping costs are quoted separately.</p>
        <p><strong>Accepted payment methods:</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>T/T (Bank Transfer)</strong> — 30% deposit, 70% before shipment</li>
          <li><strong>PayPal</strong> — Available for parts and sample orders</li>
          <li><strong>L/C (Letter of Credit)</strong> — Available for large orders upon agreement</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8">4. Shipping and Delivery</h2>
        <p>Shipping methods: Sea freight, air freight, or express courier (DHL/FedEx/UPS). Delivery times are estimates only. We are not responsible for delays caused by customs clearance, weather, or carrier issues. Shipping costs include export packaging and documentation.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">5. Warranty</h2>
        <p>All Aikerui machines come with a <strong>1-year warranty</strong> covering manufacturing defects in materials and workmanship.</p>
        <p><strong>Warranty coverage:</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Replacement parts for defective components</li>
          <li>Technical support via email/WhatsApp</li>
        </ul>
        <p><strong>Not covered:</strong></p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Damage caused by improper use, maintenance, or modification</li>
          <li>Normal wear items (brushes, squeegee blades, batteries, filters)</li>
          <li>Labor costs for repairs by third parties</li>
          <li>Shipping costs for warranty returns</li>
        </ul>
        <p>Extended warranty options are available upon request.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">6. Returns and Refunds</h2>
        <p>Returns are accepted within 14 days of delivery for unused machines in original packaging. Buyer bears return shipping costs. A 15% restocking fee applies. Custom/OEM orders are non-returnable.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">7. Limitation of Liability</h2>
        <p>Aikerui's total liability shall not exceed the purchase price of the product. We are not liable for consequential damages, lost profits, or business interruption.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">8. Governing Law</h2>
        <p>These terms shall be governed by the laws of the People's Republic of China. Any disputes shall first be resolved through negotiation; if unsuccessful, they shall be submitted to the competent court in Hefei, Anhui, China.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">9. Contact</h2>
        <p>
          For questions about these terms:<br />
          Email: <a href="mailto:info@aikeruiclean.com" className="text-primary hover:underline">info@aikeruiclean.com</a><br />
          Phone: +86 199 6523 6428
        </p>
      </div>
    </div>
  );
}
