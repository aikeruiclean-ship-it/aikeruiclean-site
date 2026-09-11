"use client";

import { usePathname } from "next/navigation";
import { AdminNav } from "@/components/admin-nav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 登录页不显示后台导航
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <main className="lg:pl-64">{children}</main>
    </div>
  );
}
