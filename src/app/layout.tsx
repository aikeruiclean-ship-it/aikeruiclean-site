import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/lib/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aikerui - Industrial Floor Cleaning Machines | Scrubbers & Sweepers",
  description:
    "Professional manufacturer of industrial floor scrubbers, sweepers, and cleaning accessories. B2B wholesale, custom OEM solutions. Get a quote today.",
  keywords: [
    "floor scrubber",
    "floor sweeper",
    "industrial cleaning machine",
    "walk behind scrubber",
    "ride on scrubber",
    "Aikerui",
    "cleaning equipment manufacturer",
  ],
  metadataBase: new URL("https://www.aikeruiclean.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aikerui Floor Cleaning Machines",
    description: "Professional industrial floor scrubbers, sweepers, and cleaning solutions manufacturer.",
    siteName: "Aikerui",
    locale: "en_US",
    type: "website",
    url: "https://www.aikeruiclean.com",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Aikerui Industrial Floor Cleaning Machines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aikerui Floor Cleaning Machines",
    description: "Professional industrial floor scrubbers, sweepers, and cleaning solutions manufacturer.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX');`
        }} />
        {/* LocalBusiness Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Aikerui Cleaning Technology Co., Ltd.",
            image: "https://www.aikeruiclean.com/opengraph-image",
            telephone: "+86-199-6523-6428",
            email: "info@aikeruiclean.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "No. 058, Yuantan Road, Yuantan Town, Qianshan City",
              addressLocality: "Anqing",
              addressRegion: "Anhui",
              postalCode: "246300",
              addressCountry: "CN"
            },
            url: "https://www.aikeruiclean.com",
            description: "Professional manufacturer of industrial floor scrubbers, sweepers, and cleaning accessories. Factory-direct pricing, CE certified.",
            areaServed: { "@type": "Country", name: "Worldwide" },
            priceRange: "$$"
          })
        }} />
      </head>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
