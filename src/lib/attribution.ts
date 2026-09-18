// Attribution tracking: GCLID + UTM capture for Google Ads → HubSpot closed loop.
// Usage:
//   const att = getAttribution();          // read URL params + persisted values
//   attachAttribution(body);               // merge into POST body
//   persistAttribution();                  // call once on page load to store URL params

const GCLID_KEY = "aikerui_gclid";
const UTM_KEY = "aikerui_utm";
const LANDING_KEY = "aikerui_landing";

export interface Attribution {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
}

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, val: string) {
  try {
    window.localStorage.setItem(key, val);
  } catch {
    /* ignore */
  }
}

/** Call on page load: read ?gclid= & ?utm_* from URL and persist them. */
export function persistAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);

    const gclid = params.get("gclid");
    if (gclid) safeSet(GCLID_KEY, gclid);

    const utm: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
      const v = params.get(k);
      if (v) utm[k] = v;
    });
    if (Object.keys(utm).length) safeSet(UTM_KEY, JSON.stringify(utm));

    // Landing page (path only, keep it short & stable)
    safeSet(LANDING_KEY, window.location.pathname);
  } catch {
    /* ignore */
  }
}

/** Read persisted + current attribution. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const att: Attribution = {};

  // Fresh URL params win over stored (e.g. re-clicked ad)
  const params = new URLSearchParams(window.location.search);
  const gclidParam = params.get("gclid");
  const storedGclid = safeGet(GCLID_KEY);
  if (gclidParam) {
    att.gclid = gclidParam;
    safeSet(GCLID_KEY, gclidParam);
  } else if (storedGclid) {
    att.gclid = storedGclid;
  }

  // UTM: merge stored + current (current wins)
  const storedUtmRaw = safeGet(UTM_KEY);
  let storedUtm: Record<string, string> = {};
  if (storedUtmRaw) {
    try {
      storedUtm = JSON.parse(storedUtmRaw);
    } catch {
      storedUtm = {};
    }
  }
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
    const v = params.get(k);
    if (v) {
      (att as Record<string, string>)[k] = v;
      storedUtm[k] = v;
    } else if (storedUtm[k]) {
      (att as Record<string, string>)[k] = storedUtm[k];
    }
  });
  if (Object.keys(storedUtm).length) safeSet(UTM_KEY, JSON.stringify(storedUtm));

  att.landing_page = safeGet(LANDING_KEY) || window.location.pathname;
  return att;
}

/** Merge attribution into a body object before POSTing. */
export function attachAttribution(body: Record<string, unknown>): Record<string, unknown> {
  const att = getAttribution();
  if (att.gclid) body.gclid = att.gclid;
  if (att.utm_source) body.utm_source = att.utm_source;
  if (att.utm_medium) body.utm_medium = att.utm_medium;
  if (att.utm_campaign) body.utm_campaign = att.utm_campaign;
  if (att.utm_term) body.utm_term = att.utm_term;
  if (att.utm_content) body.utm_content = att.utm_content;
  if (att.landing_page) body.landing_page = att.landing_page;
  return body;
}
