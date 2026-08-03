import fs from "fs";
import path from "path";

export interface Review {
  id: number;
  name: string;
  company: string;
  country: string;
  rating: number; // 1-5
  message: string;
  product: string;
  approved: boolean; // 管理员审核后才显示
  timestamp: string;
}

const DATA_PATH = path.join(process.cwd(), "data", "reviews.json");

function ensureDir() {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readReviews(): Review[] {
  ensureDir();
  if (!fs.existsSync(DATA_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeReviews(reviews: Review[]) {
  ensureDir();
  fs.writeFileSync(DATA_PATH, JSON.stringify(reviews, null, 2));
}

export function saveReview(review: Omit<Review, "id" | "approved">): Review {
  const reviews = readReviews();
  const id = reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1;
  const newReview: Review = {
    ...review,
    id,
    approved: false, // 默认未审核，防止垃圾评价直接显示
  };
  reviews.push(newReview);
  writeReviews(reviews);
  return newReview;
}

export function getApprovedReviews(): Review[] {
  return readReviews()
    .filter((r) => r.approved)
    .sort((a, b) => b.id - a.id);
}

export function getReviews(): Review[] {
  return readReviews().sort((a, b) => b.id - a.id);
}

export function approveReview(id: number): Review | null {
  const reviews = readReviews();
  const idx = reviews.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  reviews[idx] = { ...reviews[idx], approved: true };
  writeReviews(reviews);
  return reviews[idx];
}

export function rejectReview(id: number): boolean {
  const reviews = readReviews();
  const idx = reviews.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  reviews.splice(idx, 1);
  writeReviews(reviews);
  return true;
}
