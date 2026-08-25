import Link from "next/link";

/**
 * YouTubeLink component:
 * - Uses a local <video> file when available in /videos/{videoId}.mp4 (no platform restrictions)
 * - Falls back to YouTube iframe embed when no local file exists
 * - Always shows a "Watch on YouTube" link as backup
 */
const LOCAL_VIDEOS: Record<string, { src: string; poster?: string }> = {
  // videoId → local mp4 path (upload to public/videos/) + optional local poster
  XrHK1POi7yY: { src: "/videos/steel-wire-brush.mp4" },
  fuP35AeMNGk: { src: "/videos/disc-brush.mp4" },
  IfTGVM4OC_k: { src: "/videos/disc-brush-buying.mp4" },
  "shampoo-disc-brush": {
    src: "/videos/shampoo-disc-brush.mp4",
    poster: "/images/shampoo-disc-brush-poster.jpg",
  },
  antibrush24: { src: "/videos/anti-tangle-brush.mp4" },
  custombrush25: { src: "/videos/custom-brush.mp4" },
};

export function YouTubeLink({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const localVideo = LOCAL_VIDEOS[videoId];

  return (
    <div className="my-8">
      {localVideo ? (
        /* Local video — plays directly from our server, no embed restrictions */
        <video
          className="w-full aspect-video rounded-xl bg-gray-100 border-0"
          controls
          preload="none"
          poster={
            localVideo.poster ??
            `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
          }
        >
          <source src={localVideo.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        /* Fallback: YouTube iframe embed */
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
      )}
      {/* Fallback link for contexts where iframe is blocked — only when no local video */}
      {!localVideo && (
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
      )}
    </div>
  );
}
