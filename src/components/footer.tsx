import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "@/lib/icons";
import { categories, getCategoryCounts } from "@/lib/products";

export function Footer() {
  const counts = getCategoryCounts();

  return (
    <footer className="bg-primary text-white font-['system-ui,-apple-system,sans-serif']">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <span className="text-lg font-bold">Aikerui</span>
              <span className="text-xs text-gray-300 block leading-tight">Floor Cleaning Machines</span>
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Professional manufacturer of industrial floor cleaning machines, sweepers, and accessories. Serving global clients with reliable cleaning solutions since 2008.
          </p>
        </div>

        {/* Products */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-accent">
            Products
          </h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  href={cat === "Parts" ? "/parts" : `/products?category=${encodeURIComponent(cat)}`}
                  className="text-sm text-gray-300 hover:text-accent transition-colors"
                >
                  {cat} ({counts[cat] || 0})
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-accent">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "All Products" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-300 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-accent">
            Contact
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-gray-300">
              <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>Industrial Zone, Anqing City, Anhui, China</span>
            </li>
            <li>
              <a href="tel:+8619965236428" className="flex items-center gap-2 text-sm text-gray-300 hover:text-accent transition-colors">
                <Phone size={16} className="shrink-0 text-accent" />
                <span>+86 199 6523 6428</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@aikeruiclean.com" className="flex items-center gap-2 text-sm text-gray-300 hover:text-accent transition-colors">
                <Mail size={16} className="shrink-0 text-accent" />
                <span>info@aikeruiclean.com</span>
              </a>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-300">
              <Clock size={16} className="mt-0.5 shrink-0 text-accent" />
              <span>Mon–Fri: 8:30 AM – 6:00 PM (CST)</span>
            </li>
          </ul>

          {/* Social links */}
          <div className="mt-5 pt-5 border-t border-white/10">
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-accent">
              Follow Us
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.linkedin.com/company/aikerui" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@markxu-u8h" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://x.com/mark_xu71710" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  X / Twitter
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/aikeruiclean" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.quora.com/profile/Mark-Xu-110" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  Quora
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Anhui Aikerui Environmental Protection Technology CO.,LTD All rights reserved. | <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms &amp; Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
