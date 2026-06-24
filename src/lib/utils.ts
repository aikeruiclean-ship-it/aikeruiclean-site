export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Whitelist of safe HTML tags for product descriptions */
const SAFE_TAGS = new Set([
  "b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li",
  "h1", "h2", "h3", "h4", "h5", "h6", "span", "div", "table",
  "thead", "tbody", "tr", "td", "th", "img", "hr", "blockquote",
  "pre", "code", "sub", "sup", "dl", "dt", "dd",
]);

/**
 * Strip dangerous HTML (scripts, event handlers, iframes) while keeping
 * safe formatting tags. Used before dangerouslySetInnerHTML.
 */
export function sanitizeHtml(html: string): string {
  // 1. Remove <script>, <style>, <iframe>, <object>, <embed> entirely
  let out = html.replace(
    /<(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi,
    ""
  );
  out = out.replace(/<(script|style|iframe|object|embed)[^>]*\/?>/gi, "");

  // 2. Strip on* event attributes and javascript: URLs
  out = out.replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  out = out.replace(/href\s*=\s*["']\s*javascript:/gi, 'href="');

  // 3. Remove non-whitelisted tags (keep their content)
  //    Match opening tags not in safe list
  out = out.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*\/?>/g, (match, tag) => {
    const lower = tag.toLowerCase();
    if (SAFE_TAGS.has(lower)) {
      // For <a> tags, keep only href/title/rel/target attributes
      if (lower === "a") {
        const clean = match.replace(
          /\s+(?!href\b|title\b|rel\b|target\b)[a-zA-Z-]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,
          ""
        );
        return clean;
      }
      // For <img> tags, keep only src/alt/width/height
      if (lower === "img") {
        const clean = match.replace(
          /\s+(?!src\b|alt\b|width\b|height\b|loading\b)[a-zA-Z-]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,
          ""
        );
        return clean;
      }
      return match;
    }
    // Non-whitelisted tag: strip the tag but keep inner content
    if (match.startsWith("</")) return "";
    return "";
  });

  return out;
}
