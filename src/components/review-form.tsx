"use client";

import { useState } from "react";
import { Star, CheckCircle } from "@/lib/icons";

export function ReviewForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Please fill in your name and review.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, country, rating, message, product }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
      <h3 className="text-lg font-bold text-gray-900 text-center mb-1">Leave a Review</h3>
      <p className="text-sm text-gray-500 text-center mb-6">
        Worked with us? Share your experience — helps other buyers.
      </p>

      {submitted ? (
        <div className="text-center py-8">
          <CheckCircle size={48} className="mx-auto text-green-500 mb-3" />
          <p className="font-bold text-gray-900 text-lg mb-1">Thank you!</p>
          <p className="text-sm text-gray-600">Your review has been submitted for approval.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star rating */}
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5"
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
              >
                <Star
                  size={28}
                  className={(hoverRating || rating) >= star ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                />
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" required placeholder="Your Name *" value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            <input type="text" placeholder="Company Name" value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Country" value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            <input type="text" placeholder="Product bought (e.g. Disc Brush)" value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>

          <textarea required rows={4} placeholder="Tell us about your experience — quality, shipping, service... *" value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button type="submit" disabled={sending}
            className="w-full py-3.5 bg-accent hover:bg-accent-hover disabled:bg-gray-300 text-white font-bold rounded-lg transition-colors">
            {sending ? "Submitting..." : "Submit Review"}
          </button>
          <p className="text-xs text-gray-400 text-center">
            Reviews are verified before publishing to keep them authentic.
          </p>
        </form>
      )}
    </div>
  );
}
