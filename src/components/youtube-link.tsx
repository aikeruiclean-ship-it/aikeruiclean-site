import Link from "next/link";

export function YouTubeLink({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  return (
    <div className="my-8">
      {/* Embedded iframe — video plays inline, AI crawlers can read content */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      {/* Fallback link for contexts where iframe is blocked */}
      <div className="mt-2 text-center">
        <Link
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-light transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch on YouTube
        </Link>
      </div>
    </div>
  );
}
