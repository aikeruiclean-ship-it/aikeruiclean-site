"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, Mail, ChevronDown, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { categories, getCategoryCounts, getPartSubcategories } from "@/lib/products";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/search-bar";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const counts = getCategoryCounts();

  const navLinks = [
    { href: "/", label: "Home" },
    {
      href: "/products",
      label: "Products",
      children: categories
        .filter((cat) => cat !== "Parts")
        .map((cat) => ({
          href: `/products?category=${encodeURIComponent(cat)}`,
          label: `${cat} (${counts[cat] || 0})`,
        })),
    },
    { href: "/parts", label: "Parts" },
    { href: "/guides", label: "Guides" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="hidden lg:block bg-primary text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-end gap-6">
          <a href="tel:+8619965236428" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Phone size={14} />
            <span>+86 199 6523 6428</span>
          </a>
          <a href="mailto:info@aikeruiclean.com" className="flex items-center gap-1.5 hover:text-accent transition-colors">
            <Mail size={14} />
            <span>info@aikeruiclean.com</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="block shrink-0">
            <Image
              src="/logo.svg"
              alt="Aikerui"
              width={160}
              height={42}
              className="h-9 md:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {link.label}
                    <ChevronDown size={14} />
                  </Link>
                  <div className="absolute top-full left-0 mt-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[220px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            <SearchBar />
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-primary rounded-md hover:bg-gray-50 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              <CartCount />
            </Link>
            <Link
              href="/contact"
              className="ml-3 px-5 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-primary"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-200",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={cn(
          "lg:hidden fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-200",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <span className="font-bold text-primary">Menu</span>
          <button onClick={() => setMobileOpen(false)} className="p-1 text-gray-500 hover:text-primary">
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-primary rounded-lg hover:bg-gray-50 transition-colors"
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="ml-4 mt-1 space-y-0.5">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-sm text-gray-600 hover:text-primary rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 space-y-2">
            <a href="tel:+8619965236428" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600">
              <Phone size={14} /> +86 199 6523 6428
            </a>
            <a href="mailto:info@aikeruiclean.com" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600">
              <Mail size={14} /> info@aikeruiclean.com
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function CartCount() {
  const { totalItems } = useCart();
  if (totalItems === 0) return null;
  return (
    <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
      {totalItems > 99 ? "99+" : totalItems}
    </span>
  );
}
