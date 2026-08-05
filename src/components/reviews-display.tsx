"use client";

import { useEffect, useState } from "react";
import { Star } from "@/lib/icons";

interface PublicReview {
  name: string;
  company: string;
  country: string;
  rating: number;
  message: string;
  product: string;
  timestamp: string;
}

export function ReviewsDisplay() {
  const [reviews, setReviews] = useState<PublicReview[] | null>(null);

  useEffect(() => {
    fetch("/api/reviews/public")
      .then((res) => res.json())
      .then((data) => setReviews(data.reviews || []))
      .catch(() => setReviews([]));
  }, []);

  if (reviews === null) return null;
  if (reviews.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Customer Reviews ({reviews.length})
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {reviews.map((r, i) => (
          <div key={i} className="p-4 bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={14}
                    className={n <= r.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">{r.country}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{r.message}</p>
            <div className="text-sm font-medium text-gray-900">
              {r.name}
              {r.company ? ` — ${r.company}` : ""}
            </div>
            {r.product && (
              <div className="text-xs text-gray-500 mt-1">Purchased: {r.product}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
