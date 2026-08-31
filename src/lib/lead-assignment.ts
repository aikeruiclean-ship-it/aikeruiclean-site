import fs from "fs";
import path from "path";
import { pickRoundRobin, type SalesPerson, SALES_TEAM } from "./sales-team";

/**
 * Lead assignment with email memory:
 * - A returning customer (same email) is always assigned to the SAME salesperson.
 * - A new customer is assigned round-robin.
 *
 * Persisted to data/assignments.json (email → salesperson id).
 * Note: on Vercel serverless, this file may not persist between cold starts;
 * falls back to scanning leads.json history if the mapping file is missing.
 */

const ASSIGN_PATH = path.join(process.cwd(), "data", "assignments.json");

interface AssignmentMap {
  [email: string]: number; // email → salesperson id
}

function ensureDir() {
  const dir = path.dirname(ASSIGN_PATH);
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  } catch (err) {
    // read-only fs on Vercel serverless — non-fatal
    console.error("ensureDir skipped (read-only fs):", err);
  }
}

function readAssignments(): AssignmentMap {
  ensureDir();
  if (!fs.existsSync(ASSIGN_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(ASSIGN_PATH, "utf8"));
  } catch {
    return {};
  }
}

function writeAssignments(map: AssignmentMap) {
  ensureDir();
  try {
    fs.writeFileSync(ASSIGN_PATH, JSON.stringify(map), "utf8");
  } catch (err) {
    console.error("Failed to persist assignments:", err);
  }
}

function findInLeadHistory(email: string): number | null {
  // Look up past leads to find who this customer was assigned to before
  try {
    const leadsPath = path.join(process.cwd(), "data", "leads.json");
    if (!fs.existsSync(leadsPath)) return null;
    const leads = JSON.parse(fs.readFileSync(leadsPath, "utf8")) as Array<{
      email?: string;
      assignedTo?: string;
    }>;
    const match = [...leads]
      .reverse()
      .find((l) => l.email && l.email.toLowerCase() === email.toLowerCase());
    if (match && match.assignedTo) {
      const person = SALES_TEAM.find((p) => p.name === match.assignedTo);
      if (person) return person.id;
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Assign a salesperson to an inquiry.
 * Returning email → same salesperson. New email → round-robin.
 */
export function assignSalesperson(email: string): SalesPerson {
  const normalized = (email || "").trim().toLowerCase();
  const map = readAssignments();

  // 1. Existing mapping? Reuse it.
  if (normalized && map[normalized] !== undefined) {
    const person = SALES_TEAM.find((p) => p.id === map[normalized]);
    if (person) return person;
  }

  // 2. Check lead history (fallback if mapping file was lost on serverless).
  if (normalized) {
    const historyId = findInLeadHistory(normalized);
    if (historyId !== null) {
      const person = SALES_TEAM.find((p) => p.id === historyId);
      if (person) {
        map[normalized] = historyId;
        writeAssignments(map);
        return person;
      }
    }
  }

  // 3. New customer → round-robin, then remember.
  const person = pickRoundRobin();
  if (normalized) {
    map[normalized] = person.id;
    writeAssignments(map);
  }
  return person;
}
