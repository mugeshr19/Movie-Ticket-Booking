export function MovieCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="h-80 bg-gray-700 rounded-t-xl" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-700 rounded w-1/2" />
        <div className="h-4 bg-gray-700 rounded w-2/3" />
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-700 rounded w-16" />
          <div className="h-6 bg-gray-700 rounded w-20" />
        </div>
        <div className="h-10 bg-gray-700 rounded" />
      </div>
    </div>
  );
}