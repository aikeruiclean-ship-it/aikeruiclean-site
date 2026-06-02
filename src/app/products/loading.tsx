export default function ProductsLoading() {
  return (
    <div>
      <div className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="h-9 w-48 bg-white/20 rounded-lg animate-pulse mb-2" />
          <div className="h-6 w-72 bg-white/20 rounded-lg animate-pulse" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-56 shrink-0">
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          </aside>
          <div className="flex-1">
            <div className="h-5 w-40 bg-gray-100 rounded animate-pulse mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-200 overflow-hidden">
                  <div className="aspect-[4/3] bg-gray-100" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-100 rounded animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse" />
                    <div className="h-10 bg-gray-100 rounded-lg animate-pulse mt-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
