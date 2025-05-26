// components/SkeletonGrid.jsx
import SkeletonCard from "./homeSkeletonCard";

export default function SkeletonGrid({ count = 8 }) {
  return (
    <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
