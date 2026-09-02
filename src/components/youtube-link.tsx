import Link from "next/link";

/**
 * YouTubeLink component:
 * - Uses a local <video> file when available in /videos/{videoId}.mp4 (no platform restrictions)
 * - Falls back to YouTube iframe embed when no local file exists
 * - Always shows a "Watch on YouTube" link as backup
 */
const LOCAL_VIDEOS: Record<string, { src: string; poster?: string }> = {
  // videoId → local mp4 path (upload to public/videos/) + optional local poster
  XrHK1POi7yY: { src: "/videos/steel-wire-brush.mp4", poster: "/images/steel-wire-brush-poster.jpg" },
  fuP35AeMNGk: { src: "/videos/disc-brush.mp4", poster: "/images/disc-brush-poster.jpg" },
  IfTGVM4OC_k: { src: "/videos/disc-brush-buying.mp4", poster: "/images/disc-brush-buying-poster.jpg" },
  factorytour01: { src: "/videos/factorytour01.mp4", poster: "/images/factorytour01-poster.jpg" },
  "shampoo-disc-brush": {
    src: "/videos/shampoo-disc-brush.mp4",
    poster: "/images/shampoo-disc-brush-poster.jpg",
  },
  antibrush24: { src: "/videos/anti-tangle-brush.mp4", poster: "/images/anti-tangle-brush-poster.jpg" },
  custombrush25: { src: "/videos/custom-brush.mp4", poster: "/images/custom-brush-poster.jpg" },
  factorytour: { src: "/videos/factory-tour.mp4", poster: "/images/factory-tour-poster.jpg" },
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
          poster={localVideo.poster}
        >
          <source src={localVideo.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        /* YouTube iframe embed with graceful fallback cover */
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
      {/* Clickable cover + link for contexts where iframe is blocked or restricted */}
      {!localVideo && (
        <div className="mt-2 flex flex-col items-center gap-1.5">
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full max-w-[420px] aspect-video rounded-xl overflow-hidden bg-gray-200 border border-gray-200"
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
              alt={title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-red-600 text-white">
                <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
            <span className="absolute bottom-1.5 right-2 text-xs text-white bg-black/60 px-2 py-0.5 rounded">
              Watch on YouTube
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
