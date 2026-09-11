"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace(params.get("from") || "/admin");
        router.refresh();
      } else {
        setError("密码错误");
      }
    } catch {
      setError("请求失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Aikerui 后台</h1>
        <p className="text-xs text-gray-500 mb-6">独立站运营控制台</p>

        <label className="block text-sm font-medium text-gray-700 mb-1.5">管理密码</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          placeholder="输入密码"
        />

        {error && <p className="text-xs text-red-600 mt-2">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full mt-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light disabled:opacity-40 transition-colors"
        >
          {loading ? "验证中…" : "进入后台"}
        </button>

        <p className="text-[11px] text-gray-400 mt-4 text-center">登录状态保留 14 天</p>
      </form>
    </div>
  );
}
