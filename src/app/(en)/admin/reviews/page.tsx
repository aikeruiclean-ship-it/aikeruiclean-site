"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle, X, Star } from "@/lib/icons";

interface Review {
  id: number;
  name: string;
  company: string;
  country: string;
  rating: number;
  message: string;
  product: string;
  approved: boolean;
  timestamp: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState("");

  const fetchReviews = useCallback(async () => {
    const res = await fetch("/api/reviews");
    if (res.ok) {
      setReviews(await res.json());
      setError("");
    } else {
      setError("Failed to load reviews");
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleAction = async (id: number, action: "approve" | "reject") => {
    const res = await fetch("/api/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action }),
    });
    if (res.ok) {
      setReviews((prev) =>
        action === "approve"
          ? prev.map((r) => (r.id === id ? { ...r, approved: true } : r))
          : prev.filter((r) => r.id !== id)
      );
    }
  };

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Customer Reviews ({reviews.length})</h1>
          <button onClick={() => fetchReviews()} className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium">
            Refresh
          </button>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {pending.length > 0 && (
          <>
            <h2 className="text-lg font-bold text-amber-600 mb-3">Pending Approval ({pending.length})</h2>
            {pending.map((r) => (
              <ReviewCard key={r.id} review={r} onAction={handleAction} pending />
            ))}
          </>
        )}

        {approved.length > 0 && (
          <>
            <h2 className="text-lg font-bold text-green-600 mb-3 mt-8">Approved ({approved.length})</h2>
            {approved.map((r) => (
              <ReviewCard key={r.id} review={r} onAction={handleAction} />
            ))}
          </>
        )}

        {reviews.length === 0 && (
          <p className="text-gray-500 text-center py-10">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  onAction,
  pending,
}: {
  review: Review;
  onAction: (id: number, action: "approve" | "reject") => void;
  pending?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-5 mb-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">{review.name}</span>
            {review.company && <span className="text-sm text-gray-500">— {review.company}</span>}
            {review.country && <span className="text-sm text-gray-400">({review.country})</span>}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} className={review.rating >= star ? "text-amber-400 fill-amber-400" : "text-gray-300"} />
            ))}
            {review.product && <span className="text-xs text-gray-400 ml-2">bought: {review.product}</span>}
          </div>
        </div>
        <span className="text-xs text-gray-400">{new Date(review.timestamp).toLocaleString()}</span>
      </div>
      <p className="text-sm text-gray-700 mb-3">{review.message}</p>
      {pending ? (
        <div className="flex gap-2">
          <button
            onClick={() => onAction(review.id, "approve")}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg"
          >
            <CheckCircle size={14} /> Approve
          </button>
          <button
            onClick={() => onAction(review.id, "reject")}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg"
          >
            <X size={14} /> Reject
          </button>
        </div>
      ) : (
        <span className="text-xs text-green-600 font-medium">✓ Approved</span>
      )}
    </div>
  );
}
