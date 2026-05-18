import Link from "next/link";
import { Shield, Award, Users, Globe, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">About Aikerui</h1>
          <p className="text-gray-200 text-lg">Professional cleaning equipment manufacturer</p>
        </div>
      </section>

      {/* Company intro */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Trusted Partner in Industrial Cleaning</h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
            <p>
              Aikerui Cleaning Technology Co., Ltd. is a professional manufacturer specializing in the research, development, production, and sales of industrial floor cleaning machines. Located in Hefei City, Anhui Province — a major industrial hub in China — we have been serving global clients for over a decade.
            </p>
            <p>
              Our product line includes walk-behind and ride-on floor scrubbers, sweepers, dust collection carts, carpet extractors, and a full range of cleaning machine parts and accessories. We serve distributors, rental companies, facility management firms, and industrial enterprises worldwide.
            </p>
            <p>
              With a strong focus on quality and innovation, we have established long-term partnerships with clients across Europe, Southeast Asia, the Middle East, Africa, and the Americas. Our factory is equipped with modern production lines and testing facilities to ensure every machine meets international standards.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10+", label: "Years Experience" },
            { number: "2000+", label: "Machines Sold" },
            { number: "50+", label: "Export Countries" },
            { number: "98%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Work With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Quality First",
                desc: "Every machine undergoes rigorous testing before shipment. We hold CE and ISO certifications, ensuring consistent quality across all products.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                desc: "We understand international shipping, customs documentation, and export requirements. Our experience across 50+ countries ensures smooth delivery.",
              },
              {
                icon: Users,
                title: "Customer Partnership",
                desc: "We don't just sell machines — we provide cleaning solutions. Our team works closely with you to understand your needs and recommend the right equipment.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Certifications & Standards</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {["CE Certified", "ISO 9001", "SGS Verified", "RoHS Compliant"].map((cert) => (
              <div key={cert} className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                <CheckCircle size={20} className="text-green-600" />
                <span className="font-medium text-gray-900">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-lg text-gray-200 mb-8">
            Interested in becoming a distributor or have a large project? Contact us for partnership discussions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
