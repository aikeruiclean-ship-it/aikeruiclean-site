export interface SalesPerson {
  id: number;
  name: string;
  phone: string;
  email: string;
}

const SALES_TEAM: SalesPerson[] = [
  { id: 1, name: "Keke", phone: "8619965236428", email: "keke@czhclean.com" },
  { id: 2, name: "Rosy", phone: "8617352977258", email: "wisdom@czclean.com" },
  { id: 3, name: "Alan", phone: "8618324956076", email: "liv@czhclean.com" },
  { id: 4, name: "Jennifer", phone: "8618133073186", email: "jennifer@czhclean.com" },
];

let _roundRobinIndex = 0;

function pickRandom(): SalesPerson {
  const i = Math.floor(Math.random() * SALES_TEAM.length);
  return SALES_TEAM[i];
}

/** Pick a random salesperson — stores in sessionStorage so all widgets show the same person */
export function getOrPickPerson(): SalesPerson {
  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem("aikerui_sales");
    if (stored) {
      try { return JSON.parse(stored) as SalesPerson; } catch {}
    }
  }
  const person = pickRandom();
  if (typeof window !== "undefined") {
    sessionStorage.setItem("aikerui_sales", JSON.stringify(person));
  }
  return person;
}

/** Round-robin: distribute evenly across form submissions */
export function pickRoundRobin(): SalesPerson {
  const person = SALES_TEAM[_roundRobinIndex % SALES_TEAM.length];
  _roundRobinIndex++;
  return person;
}

/** Get all emails for CC/reply-to rotation */
export function getAllEmails(): string[] {
  return SALES_TEAM.map((p) => p.email);
}

/** Get by name */
export function getByName(name: string): SalesPerson | undefined {
  return SALES_TEAM.find((p) => p.name === name);
}
