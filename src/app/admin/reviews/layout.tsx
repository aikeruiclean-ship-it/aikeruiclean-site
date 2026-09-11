import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews | Aikerui 后台",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
