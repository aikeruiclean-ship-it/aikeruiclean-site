import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingCTA } from "@/components/floating-cta";
import { AttributionTracker } from "@/components/attribution-tracker";
import { CartProvider } from "@/lib/cart-context";
import { translatedLocales, isLocale, isRtl } from "@/i18n/config";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "optional" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "optional" });

export const metadata: Metadata = {
  metadataBase: new URL("https://aikeruiclean.com"),
};

// 只生成已翻译的 4 个语言首页（es/ar/ru/fr），保持静态预渲染
export function generateStaticParams() {
  return translatedLocales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <meta name="google-site-verification" content="9n-ScR2ZUM3VI7e8ACJvhSk7hRefGI-XdnihD4DkYx8" />
        <Script
          id="gtag"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-X8E9TNJ4D2"
        />
        <Script
          id="gtag-config"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-X8E9TNJ4D2');gtag('config','AW-18359776225');`
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Anhui Aikerui Environmental Protection Technology Co., Ltd.",
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
        <AttributionTracker />
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
