import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingCTA } from "@/components/floating-cta";
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
  metadataBase: new URL("https://aikeruiclean.com"),
  openGraph: {
    title: "Aikerui Floor Cleaning Machines",
    description: "Professional industrial floor scrubbers, sweepers, and cleaning solutions manufacturer.",
    siteName: "Aikerui",
    locale: "en_US",
    type: "website",
    url: "https://aikeruiclean.com",
    images: [
      {
        url: "/og-image.png",
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="9n-ScR2ZUM3VI7e8ACJvhSk7hRefGI-XdnihD4DkYx8" />
        {/* Google Tag (gtag.js) — GA4 + Google Ads 转化（直连，避免 GTM 容器覆盖 window.gtag） */}
        <Script
          id="gtag"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-X8E9TNJ4D2"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-X8E9TNJ4D2');gtag('config','AW-18359776225');`
          }}
        />

        {/* LocalBusiness Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Anhui Aikerui Environmental Protection Technology CO.,LTD",
            image: "https://aikeruiclean.com/og-image.png",
            logo: "https://aikeruiclean.com/aikerui-logo.png",
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
            url: "https://aikeruiclean.com",
            description: "Professional manufacturer of industrial floor scrubbers, sweepers, and cleaning accessories. Factory-direct pricing, CE certified.",
            areaServed: { "@type": "Country", name: "Worldwide" },
            priceRange: "$$",
            sameAs: [
              "https://youtube.com/@markxu-u8h",
              "https://x.com/mark_xu71710",
              "https://instagram.com/aikeruiclean",
              "https://instagram.com/aikerui",
              "https://quora.com/profile/Mark-Xu-110",
              "https://www.linkedin.com/in/mark-wang-213b12427",
              "https://www.wikidata.org/wiki/Q140546242",
              "https://aikeruiclean.com",
            ]
          })
        }} />
      </head>
      <body className="min-h-full flex flex-col">
        {/* GTM removed — direct gtag.js only (see head) */}
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingCTA />
        </CartProvider>
      </body>
    </html>
  );
}
