// components/SkeletonGrid.jsx
import SkeletonCard from "./homeSkeletonCard";

export default function SkeletonGrid({ count = 8 }) {
  return (
    <>
    <div className="relative w-[90%] mt-4 h-[200px] md:h-[400px] rounded overflow-hidden bg-gray-200 animate-pulse">
      {/* Fake image background */}
      <div className="absolute inset-0 bg-gray-300" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text skeletons */}
      <div className="relative z-10 h-full flex items-center ">
        <div className="ml-6 md:ml-10 space-y-3 md:space-y-4 max-w-xl w-[80%] h-[70%] flex flex-col justify-center">
          <div className="h-8 md:h-9 w-2/5 bg-gray-400 rounded" />
          <div className="h-6 md:h-8 w-1/3 bg-gray-400 rounded" />
          <div className="h-9 md:h-6 w-2/3 bg-gray-400 rounded" />
          <div className="h-6 md:h-9 w-1/4 bg-yellow-400 rounded" />
        </div>
      </div>

      {/* Navigation arrows placeholders */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-9 bg-black/30 rounded-r z-10" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-9 bg-black/30 rounded-l z-10" />
    </div>
    <div className="w-[90%] flex flex-col items-center justify-between mb-5">
      <h2 className="text-lg self-start font-bold bg-gray-200 mt-3 w-[120px] h-[30px] md:w-[150px] md:h-[40px]"></h2>

      <div className="flex flex-wrap justify-center items-center gap-5 md:gap-6 p-4">
        {/* Skeletons for category cards */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-[90px] h-[40px] md:w-[150px] md:h-[60px] bg-gray-200 rounded animate-pulse"
          />
        ))}

        {/* Skeleton for the View All button */}
        <div className="w-[90px] h-[40px] md:w-[150px] md:h-[60px] rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
    <div className="w-[90%] flex flex-col gap-5">
      <h2 className="text-lg self-start font-bold bg-gray-200 mt-3 w-[120px] h-[30px] md:w-[150px] md:h-[40px]"></h2>
      <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
    </>
  );
}
