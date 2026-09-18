import Link from "next/link";

export function YouTubeLink({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 my-8 group cursor-pointer">
        {/* YouTube thumbnail */}
        <img
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-700 transition-colors">
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Watch on YouTube label */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
          Watch on YouTube ↗
        </div>
      </div>
    </a>
  );
}
