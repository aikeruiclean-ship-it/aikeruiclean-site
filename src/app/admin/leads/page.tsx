"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  RefreshCw,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Building,
  Package,
  Clock,
  User,
  X,
} from "@/lib/icons";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  product: string;
  quantity: string;
  message: string;
  assignedTo: string;
  assignedEmail: string;
  timestamp: string;
  status: "new" | "contacted" | "quoted" | "won" | "lost";
  notes: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  quoted: "bg-purple-100 text-purple-800",
  won: "bg-green-100 text-green-800",
  lost: "bg-gray-100 text-gray-500",
};

export default function AdminLeadsPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchLeads = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Auth failed");
      setLeads(await res.json());
      setError("");
    } catch {
      setError("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchLeads();
  }, [token, fetchLeads]);

  const updateStatus = async (id: number, status: string) => {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });
      fetchLeads();
    } catch {
      /* ignore */
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setToken(password);
  };

  // Auth screen
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full"
        >
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Aikerui Leads
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors"
          >
            Unlock
          </button>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Default: aikerui2026
          </p>
        </form>
      </div>
    );
  }

  // Filter & search
  const filtered = leads.filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(s) ||
      l.email.toLowerCase().includes(s) ||
      l.company.toLowerCase().includes(s) ||
      l.country.toLowerCase().includes(s) ||
      l.product.toLowerCase().includes(s) ||
      l.message.toLowerCase().includes(s)
    );
  });

  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    quoted: leads.filter((l) => l.status === "quoted").length,
    won: leads.filter((l) => l.status === "won").length,
    lost: leads.filter((l) => l.status === "lost").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">
            Customer Leads ({leads.length})
          </h1>
          <button
            onClick={fetchLeads}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Search + filters */}
        <div className="max-w-7xl mx-auto px-4 pb-3 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, company, country..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {([
              ["all", counts.all],
              ["new", counts.new],
              ["contacted", counts.contacted],
              ["quoted", counts.quoted],
              ["won", counts.won],
            ] as [string, number][]).map(([k, v]) => (
              <button
                key={k}
                onClick={() => setStatusFilter(k)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  statusFilter === k
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {k === "all" ? "All" : k} ({v})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads list */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No leads yet</p>
            <p className="text-sm mt-1">
              Leads will appear here when customers submit inquiries.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {filtered.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Summary row */}
              <div
                className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() =>
                  setExpandedId(expandedId === lead.id ? null : lead.id)
                }
              >
                <span className="text-xs text-gray-400 w-8 shrink-0">
                  #{lead.id}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-sm truncate">
                      {lead.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        STATUS_COLORS[lead.status]
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                    <span className="truncate">{lead.product}</span>
                    {lead.country && (
                      <span className="flex items-center gap-1 shrink-0">
                        <MapPin size={10} /> {lead.country}
                      </span>
                    )}
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock size={10} />{" "}
                      {new Date(lead.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-500 flex items-center gap-1 shrink-0">
                  <User size={10} /> {lead.assignedTo}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform ${
                    expandedId === lead.id ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Expanded detail */}
              {expandedId === lead.id && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
                  {/* Contact info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {lead.email && (
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                      >
                        <Mail size={10} /> {lead.email}
                      </a>
                    )}
                    {lead.phone && (
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                      >
                        <Phone size={10} /> {lead.phone}
                      </a>
                    )}
                    {lead.company && (
                      <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Building size={10} /> {lead.company}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Package size={10} /> Qty: {lead.quantity || "—"}
                    </span>
                  </div>

                  {/* Message */}
                  {lead.message && (
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                      {lead.message}
                    </div>
                  )}

                  {/* Assignment */}
                  <div className="text-xs text-gray-500">
                    Assigned to:{" "}
                    <strong>
                      {lead.assignedTo}
                    </strong>{" "}
                    ({lead.assignedEmail})
                  </div>

                  {/* Status actions */}
                  <div className="flex gap-2">
                    {["new", "contacted", "quoted", "won", "lost"]
                      .filter((s) => s !== lead.status)
                      .map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(lead.id, s)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium ${
                            STATUS_COLORS[s]
                          } opacity-60 hover:opacity-100 transition-opacity`}
                        >
                          Mark {s}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {loading && (
          <div className="text-center py-8 text-sm text-gray-400">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}
