"use client";

import { useEffect, useState } from "react";

type WaClick = {
  id: number;
  time: string;
  page: string;
  salesName: string;
  salesPhone: string;
  referrer: string;
};

export default function WhatsAppAdminPage() {
  const [clicks, setClicks] = useState<WaClick[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("aikerui_admin");
    if (token === "aikerui2026") {
      setAuthed(true);
      loadClicks();
    } else {
      setLoading(false);
    }
  }, []);

  const loadClicks = async () => {
    try {
      const res = await fetch("/api/whatsapp-track");
      const data = await res.json();
      setClicks(Array.isArray(data) ? data : []);
    } catch {
      setClicks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = () => {
    if (password === "aikerui2026") {
      sessionStorage.setItem("aikerui_admin", "aikerui2026");
      setAuthed(true);
      setError("");
      loadClicks();
    } else {
      setError("Wrong password");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96">
          <h1 className="text-xl font-bold text-gray-900 mb-4">WhatsApp Leads Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg mb-3"
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button onClick={handleAuth} className="w-full py-2.5 bg-primary text-white font-semibold rounded-lg">
            Login
          </button>
        </div>
      </div>
    );
  }

  // Stats
  const total = clicks.length;
  const bySales: Record<string, number> = {};
  clicks.forEach((c) => { bySales[c.salesName] = (bySales[c.salesName] || 0) + 1; });
  const today = new Date().toISOString().split("T")[0];
  const todayCount = clicks.filter((c) => c.time.startsWith(today)).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">WhatsApp Click Monitor</h1>
          <button onClick={() => { sessionStorage.removeItem("aikerui_admin"); setAuthed(false); }} className="text-sm text-gray-500 hover:text-gray-700">
            Logout
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-3xl font-bold text-gray-900">{total}</p>
            <p className="text-sm text-gray-500">Total Clicks</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-3xl font-bold text-green-600">{todayCount}</p>
            <p className="text-sm text-gray-500">Today</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-3xl font-bold text-primary">{Object.keys(bySales).length}</p>
            <p className="text-sm text-gray-500">Salespeople Touched</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-3xl font-bold text-amber-600">{Math.round(total / Math.max(Object.keys(bySales).length, 1) * 10) / 10}</p>
            <p className="text-sm text-gray-500">Avg Per Person</p>
          </div>
        </div>

        {/* Per salesperson */}
        <div className="bg-white rounded-xl shadow mb-8 overflow-hidden">
          <h2 className="font-bold text-gray-900 p-4 border-b">Clicks by Salesperson</h2>
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 text-left text-gray-500"><th className="p-3">Salesperson</th><th className="p-3">Phone</th><th className="p-3">Clicks</th></tr></thead>
            <tbody>
              {Object.entries(bySales).map(([name, count]) => (
                <tr key={name} className="border-t"><td className="p-3 font-medium">{name}</td><td className="p-3 text-gray-500">{clicks.find((c) => c.salesName === name)?.salesPhone}</td><td className="p-3 font-bold">{count}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed log */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <h2 className="font-bold text-gray-900 p-4 border-b">Recent Clicks</h2>
          {loading ? (
            <p className="p-4 text-gray-500">Loading...</p>
          ) : clicks.length === 0 ? (
            <p className="p-4 text-gray-500">No WhatsApp clicks recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 text-left text-gray-500"><th className="p-3">Time</th><th className="p-3">Sales</th><th className="p-3">Page</th><th className="p-3">Referrer</th></tr></thead>
                <tbody>
                  {[...clicks].reverse().slice(0, 50).map((c) => (
                    <tr key={c.id} className="border-t">
                      <td className="p-3 text-gray-600 whitespace-nowrap">{new Date(c.time).toLocaleString()}</td>
                      <td className="p-3 font-medium">{c.salesName}</td>
                      <td className="p-3 text-gray-600">{c.page}</td>
                      <td className="p-3 text-gray-400 truncate max-w-[200px]">{c.referrer || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
