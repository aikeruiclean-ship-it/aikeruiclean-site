/**
 * Clean up product descriptions:
 * 1. Remove Chinese characters
 * 2. Fix HTML entities (&amp; → &, &nbsp; → space)
 * 3. Remove data-* attributes from HTML
 * 4. Clean up empty tags
 * 5. Improve template descriptions
 */
const fs = require("fs");
const path = require("path");

const PRODUCTS_JSON = path.join(__dirname, "..", "src", "lib", "products.json");
const products = JSON.parse(fs.readFileSync(PRODUCTS_JSON, "utf-8"));

// --- Helpers ---

// Remove Chinese characters (CJK Unified Ideographs)
function removeChinese(text) {
  return text.replace(/[一-鿿㐀-䶿豈-﫿]+/g, "").trim();
}

// Fix HTML entities
function fixEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, "\"")
    .replace(/&#8221;/g, "\"")
    .replace(/&#8243;/g, "\"");
}

// Remove data-* attributes from HTML tags
function removeDataAttrs(html) {
  return html.replace(/\s+data-[\w-]+="[^"]*"/g, "");
}

// Remove empty divs
function removeEmptyDivs(html) {
  return html.replace(/<div>\s*<\/div>/g, "").replace(/<div><\/div>/g, "");
}

// Strip HTML tags for plain text extraction
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").trim();
}

// Generate a better description for template parts
function generateDescription(product) {
  const name = product.name;
  const subcategory = product.partSubcategory
    ? product.partSubcategory.split(" / ")[0].trim()
    : "replacement part";
  const specs = product.specs || {};

  let specBullets = "";
  if (Object.keys(specs).length > 0) {
    specBullets =
      "\n<ul>\n" +
      Object.entries(specs)
        .map(
          ([key, val]) =>
            `    <li><strong>${key}</strong>: ${val}</li>`
        )
        .join("\n") +
      "\n</ul>";
  }

  return `<p>High-quality ${subcategory.toLowerCase()} designed for professional floor cleaning equipment. The ${name} is engineered to deliver reliable performance and long service life in demanding commercial and industrial environments.</p>${specBullets}`;
}

// --- Main cleanup ---

let templateCount = 0;
let customCount = 0;

const updated = products.map((product) => {
  let desc = product.description || "";
  let shortDesc = product.shortDescription || "";

  // Step 1: Fix HTML entities
  desc = fixEntities(desc);
  shortDesc = fixEntities(shortDesc);

  // Step 2: Remove data-* attributes
  desc = removeDataAttrs(desc);
  shortDesc = removeDataAttrs(shortDesc);

  // Step 3: Remove empty divs
  desc = removeEmptyDivs(desc);

  // Step 4: Remove Chinese characters from descriptions
  desc = removeChinese(desc);
  shortDesc = removeChinese(shortDesc);

  // Step 5: For template descriptions, generate better content
  if (
    desc.includes("Industrial cleaning equipment replacement part") ||
    desc.includes("Compatible with various floor scrubber and sweeper models")
  ) {
    desc = generateDescription(product);
    shortDesc = shortDesc || `High-quality ${(product.partSubcategory || "replacement part").split(" / ")[0].trim().toLowerCase()} for floor scrubbers and sweepers.`;
    templateCount++;
  } else {
    // Clean up custom descriptions - remove empty bold/strong tags
    desc = desc.replace(/<strong>\s*<\/strong>/g, "").replace(/<b>\s*<\/b>/g, "");
    // Trim multiple newlines
    desc = desc.replace(/\n{3,}/g, "\n\n");
    customCount++;
  }

  // Clean shortDescription too
  shortDesc = shortDesc.trim();
  desc = desc.trim();

  return { ...product, description: desc, shortDescription: shortDesc };
});

fs.writeFileSync(PRODUCTS_JSON, JSON.stringify(updated, null, 2));
console.log(`Updated descriptions:`);
console.log(`  Template descriptions regenerated: ${templateCount}`);
console.log(`  Custom descriptions cleaned: ${customCount}`);

// Verify
let chineseCount = 0;
updated.forEach((p) => {
  if (p.description && /[一-鿿]/.test(p.description)) chineseCount++;
});
console.log(`  Remaining Chinese in descriptions: ${chineseCount}`);
console.log(`Done.`);
