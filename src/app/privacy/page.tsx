import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/breadcrumb";

const PRIVACY_BREADCRUMB = {
  items: [{ name: "Home", item: "/" }, { name: "Privacy Policy", item: "/privacy" }],
};

export const metadata = {
  title: "Privacy Policy | Aikerui Cleaning Technology Co., Ltd.",
  description: "Aikerui Privacy Policy. Learn how we collect, store, and protect your personal information when you contact us or use our website.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <JsonLd data={breadcrumbJsonLd(PRIVACY_BREADCRUMB)} />

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: June 17, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6">
        <p>Aikerui Cleaning Technology Co., Ltd. ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or contact us.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">1. Information We Collect</h2>
        <p>When you submit an inquiry via our contact form, we collect:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Your full name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Company name</li>
          <li>Country of origin</li>
          <li>Product interest and message content</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 mt-8">2. How We Use Your Information</h2>
        <p>We use your personal information solely for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Responding to your product inquiries and providing quotes</li>
          <li>Communicating about your orders and shipments</li>
          <li>Providing technical support and after-sales service</li>
          <li>Sending relevant product updates only if you have opted in</li>
        </ul>
        <p><strong>We do not sell, rent, or share your personal information with third parties for marketing purposes.</strong></p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">3. Data Storage and Security</h2>
        <p>Your data is stored securely on our servers. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We retain inquiry data for up to 2 years after your last contact.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">4. Cookies</h2>
        <p>Our website uses minimal cookies:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Google Analytics:</strong> Anonymous traffic data (page views, session duration). No personally identifiable information is collected.</li>
          <li><strong>Functional cookies:</strong> Shopping cart functionality for parts orders.</li>
        </ul>
        <p>You can disable cookies in your browser settings. However, this may affect some website functionality.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">5. Third-Party Services</h2>
        <p>We use the following third-party services:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Google Analytics</strong> — anonymous website traffic analysis</li>
          <li><strong>PayPal</strong> — payment processing for orders (if applicable)</li>
          <li><strong>Vercel</strong> — website hosting</li>
        </ul>
        <p>Each service has its own privacy policy governing data handling.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Request access to your personal data we hold</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>To exercise these rights, contact us at the email below.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-8">7. Contact Us</h2>
        <p>For privacy-related inquiries:</p>
        <p>
          Email: <a href="mailto:info@aikeruiclean.com" className="text-primary hover:underline">info@aikeruiclean.com</a><br />
          Phone: <span className="text-gray-900">+86 199 6523 6428</span><br />
          Company: Aikerui Cleaning Technology Co., Ltd.<br />
          Address: No. 058, Yuantan Road, Yuantan Town, Qianshan City, Anqing City, Anhui Province, China
        </p>
      </div>
    </div>
  );
}
