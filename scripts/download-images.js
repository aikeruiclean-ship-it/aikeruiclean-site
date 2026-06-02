/**
 * Download product images from floorbrushes.com WordPress API
 * and update products.json with local image references.
 *
 * Run: node scripts/download-images.js
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const PRODUCTS_JSON = path.join(__dirname, "..", "src", "lib", "products.json");
const IMAGES_DIR = path.join(__dirname, "..", "public", "images", "parts");

// Ensure images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const products = JSON.parse(fs.readFileSync(PRODUCTS_JSON, "utf-8"));

// --- Step 1: Fetch all WP products ---
async function fetchAll(url) {
  const items = [];
  let page = 1;
  let totalPages = 1;
  while (page <= totalPages) {
    const u = `${url}&page=${page}`;
    console.log(`Fetching ${u} ...`);
    const { data, headers } = await httpGet(u);
    items.push(...data);
    if (page === 1) {
      totalPages = parseInt(headers["x-wp-totalpages"] || "1", 10);
    }
    page++;
  }
  return items;
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try {
          resolve({
            data: JSON.parse(body),
            headers: res.headers,
          });
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      resolve("skipped (exists)");
      return;
    }
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve("downloaded");
      });
      file.on("error", reject);
    }).on("error", reject);
  });
}

// --- Step 2: Extract SKU from WP product title ---
function extractSku(wpProduct) {
  if (wpProduct.sku) return wpProduct.sku;
  const title = wpProduct.title.rendered;
  // Pattern: "... (CZ-F21-1)" or similar
  const parenMatch = title.match(/\(([A-Z0-9][A-Z0-9\-]+)\)/);
  if (parenMatch) return parenMatch[1];
  return null;
}

// --- Step 3: Normalize string for matching ---
function normalize(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// --- Main ---
async function main() {
  // Fetch all WP products
  const wpProducts = await fetchAll(
    "https://floorbrushes.com/wp-json/wp/v2/product?per_page=100&_fields=id,title,slug,featured_media,sku"
  );
  console.log(`Fetched ${wpProducts.length} WP products`);

  // Fetch all media items (first 500 is usually enough for product images)
  const wpMedia = await fetchAll(
    "https://floorbrushes.com/wp-json/wp/v2/media?per_page=100&_fields=id,source_url,title"
  );
  console.log(`Fetched ${wpMedia.length} media items`);

  // Build media URL lookup
  const mediaUrls = {};
  for (const m of wpMedia) {
    // For each media ID, keep the _00 (first) image as primary
    if (!mediaUrls[m.id] || m.title?.rendered?.endsWith("_00")) {
      mediaUrls[m.id] = m.source_url;
    }
  }

  // Build mapping: WP product SKU -> primary image URL
  const wpSkuToImage = {};
  for (const wp of wpProducts) {
    const sku = extractSku(wp);
    if (sku && wp.featured_media && mediaUrls[wp.featured_media]) {
      wpSkuToImage[sku] = mediaUrls[wp.featured_media];
    }
  }

  console.log(`\nWP products with extractable SKU + image: ${Object.keys(wpSkuToImage).length}`);
  console.log("Sample mappings:");
  Object.entries(wpSkuToImage).slice(0, 10).forEach(([sku, url]) => {
    console.log(`  ${sku} -> ${url}`);
  });

  // --- Match to our parts ---
  // Our parts have long WooCommerce numeric SKUs.
  // The matching is tricky: WP SKUs are meaningful (CZ-F23), ours are numeric.
  // Strategy: match by normalized name keywords between our product name and WP product title.

  const partsNoImage = products.filter(
    (p) => p.category === "Parts" && (!p.images || p.images.length === 0)
  );
  console.log(`\nParts without images: ${partsNoImage.length}`);

  // Build a manual SKU mapping for exact matches
  // For flanges: our product names contain CZ-FXX references
  const matched = [];
  let matchCount = 0;

  for (const part of partsNoImage) {
    const nameNorm = normalize(part.name);

    // Try to find a WP SKU embedded in the product name
    // e.g., "Floor Scrubber Flange (CZ-F23)" -> CZ-F23
    let found = false;
    for (const [wpSku, imgUrl] of Object.entries(wpSkuToImage)) {
      const skuNorm = normalize(wpSku);
      if (nameNorm.includes(skuNorm)) {
        matched.push({ part, wpSku, imgUrl });
        found = true;
        matchCount++;
        break;
      }
    }

    if (!found) {
      // Also try matching against WP product titles
      for (const wp of wpProducts) {
        const wpTitleNorm = normalize(wp.title.rendered);
        if (nameNorm.includes(wpTitleNorm) || wpTitleNorm.includes(nameNorm)) {
          if (wp.featured_media && mediaUrls[wp.featured_media]) {
            matched.push({ part, wpSku: wp.sku || "?", imgUrl: mediaUrls[wp.featured_media] });
            matchCount++;
            found = true;
            break;
          }
        }
      }
    }

    if (!found) {
      // Check if our product name contains CZ- pattern directly
      const czMatch = part.name.match(/CZ-[A-Z0-9\-]+/i);
      if (czMatch) {
        const czSku = czMatch[0];
        if (wpSkuToImage[czSku]) {
          matched.push({ part, wpSku: czSku, imgUrl: wpSkuToImage[czSku] });
          matchCount++;
        }
      }
    }
  }

  console.log(`\nMatched ${matchCount} parts to images`);
  console.log("\nMatched products:");
  matched.slice(0, 20).forEach((m) => {
    console.log(`  ${m.part.sku} | ${m.part.name} -> ${m.imgUrl}`);
  });

  // --- Download images ---
  console.log("\nDownloading images...");
  const downloadResults = [];
  for (const m of matched) {
    const ext = path.extname(new URL(m.imgUrl).pathname) || ".webp";
    const filename = `${m.part.sku}${ext}`;
    const dest = path.join(IMAGES_DIR, filename);
    try {
      const result = await download(m.imgUrl, dest);
      downloadResults.push({ sku: m.part.sku, file: filename, status: result });
    } catch (err) {
      console.error(`  FAILED: ${m.part.sku} - ${err.message}`);
      downloadResults.push({ sku: m.part.sku, file: filename, status: "failed" });
    }
  }

  console.log(`\nDownloaded ${downloadResults.filter(r => r.status === "downloaded").length} new images`);
  console.log(`Skipped ${downloadResults.filter(r => r.status === "skipped (exists)").length} existing images`);
  console.log(`Failed ${downloadResults.filter(r => r.status === "failed").length} images`);

  // --- Update products.json ---
  // Only update if we downloaded new images
  if (downloadResults.some(r => r.status === "downloaded")) {
    const updated = products.map((p) => {
      const match = downloadResults.find((r) => r.sku === p.sku);
      if (match && match.status !== "failed") {
        return { ...p, images: [`/images/parts/${match.file}`] };
      }
      // Also set images for existing matches that were skipped
      const anyMatch = matched.find((m) => m.part.sku === p.sku);
      if (anyMatch && (!p.images || p.images.length === 0)) {
        const ext = path.extname(new URL(anyMatch.imgUrl).pathname) || ".webp";
        const filename = `${p.sku}${ext}`;
        if (fs.existsSync(path.join(IMAGES_DIR, filename))) {
          return { ...p, images: [`/images/parts/${filename}`] };
        }
      }
      return p;
    });

    fs.writeFileSync(PRODUCTS_JSON, JSON.stringify(updated, null, 2));
    console.log(`\nUpdated products.json`);
  }

  // Summary
  console.log("\n--- SUMMARY ---");
  console.log(`Total parts: ${products.filter(p => p.category === "Parts").length}`);
  console.log(`Parts now with images: ${updated ? updated.filter(p => p.category === "Parts" && p.images && p.images.length > 0).length : products.filter(p => p.category === "Parts" && p.images && p.images.length > 0).length}`);

  // Print unmatched parts (first 20)
  const newlyMatchedSkus = new Set(matched.map(m => m.part.sku));
  const stillNoImage = partsNoImage.filter(p => !newlyMatchedSkus.has(p.sku));
  if (stillNoImage.length > 0) {
    console.log(`\nStill unmatched (${stillNoImage.length} parts, showing first 20):`);
    stillNoImage.slice(0, 20).forEach(p => {
      console.log(`  ${p.sku} | ${p.name}`);
    });
  }
}

main().catch(console.error);
