import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

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
  openGraph: {
    title: "Aikerui Floor Cleaning Machines",
    description: "Professional industrial floor scrubbers, sweepers, and cleaning solutions manufacturer.",
    siteName: "Aikerui",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
