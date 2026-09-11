import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhatsApp Clicks | Aikerui 后台",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
