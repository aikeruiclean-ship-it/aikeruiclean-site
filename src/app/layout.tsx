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
        {/* Google Tag Manager - lazy loaded after page becomes interactive */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <>
            <Script
              id="gtm"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`
              }}
            />
            {/* Google Analytics 4 via GTM */}
            <Script
              id="gtag"
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            {process.env.NEXT_PUBLIC_GA_ID && (
              <Script
                id="gtag-config"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`
                }}
              />
            )}
          </>
        )}

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
        {/* GTM noscript fallback */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
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
