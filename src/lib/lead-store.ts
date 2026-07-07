import fs from "fs";
import path from "path";

export interface Lead {
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

const DATA_PATH = path.join(process.cwd(), "data", "leads.json");

function ensureDir() {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readLeads(): Lead[] {
  ensureDir();
  if (!fs.existsSync(DATA_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeLeads(leads: Lead[]) {
  ensureDir();
  fs.writeFileSync(DATA_PATH, JSON.stringify(leads, null, 2));
}

export function saveLead(lead: Omit<Lead, "id" | "status" | "notes">): Lead {
  const leads = readLeads();
  const id = leads.length > 0 ? Math.max(...leads.map((l) => l.id)) + 1 : 1;
  const newLead: Lead = {
    ...lead,
    id,
    status: "new",
    notes: "",
  };
  leads.push(newLead);
  writeLeads(leads);
  return newLead;
}

export function getLeads(): Lead[] {
  return readLeads().sort((a, b) => b.id - a.id);
}

export function updateLead(
  id: number,
  update: Partial<Pick<Lead, "status" | "notes">>
) {
  const leads = readLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  leads[idx] = { ...leads[idx], ...update };
  writeLeads(leads);
  return leads[idx];
}
