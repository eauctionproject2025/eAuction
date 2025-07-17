"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Auction from "@/components/auction"; // reuse your auction display component

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions?search=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
            console.log("Search results:", data); 
        setResults(data);
        setLoading(false);
        });
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);
      const handleDelete = (deletedId) => {
    setAuctions((prevAuctions) => prevAuctions.filter((auction) => auction._id !== deletedId));
  };

  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold bg-yellow-400 w-[90%] my-5 py-3 rounded text-center">Search Results for "{query}"</h1>
      {loading && <p className="h-[60vh] my-15">Loading...</p>}
      {!loading && results.length === 0 && <p>No results found.</p>}
      <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-center justify-items-center">
        {results.map((auction) => (
            <Auction
              key={auction._id}
              id={auction._id}
              title={auction.title}
              price={auction.startingBid}
              href="#"
              startTime={auction.startTime}
              endTime={auction.endTime}
              imgLink={auction.imageUrls|| auction.imageUrl}
              categories={auction.categories}
              seller={auction.seller._id} 
              onDelete={handleDelete}
              publicUrl={auction.cloudUrls|| auction.cloudUrl}
            />
        ))}
      </div>
    </main>
  );
}
