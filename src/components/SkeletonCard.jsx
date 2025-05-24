// components/SkeletonCard.jsx
export default function SkeletonCard() {
  return (
    <div className=" h-[350px] bg-gray-100/10 flex flex-col items-center rounded-md shadow-md p-4 animate-pulse">
      <div className="bg-gray-300 h-[150px] rounded mb-4" />
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4" />
      <div className="h-4 bg-green-200 rounded w-full mb-4" />
      <div className="h-8 bg-blue-500 rounded w-1/2 mx-auto" />
    </div>
  );
}
