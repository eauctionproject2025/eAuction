"use client";
import AuctionList from "@/components/AuctionList";
import { useEffect, useState } from "react";
import { getActiveAuctions } from "../FetchAuctions";

export default function ActiveAuctionsPage() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const activeAuctions = await getActiveAuctions();
        setAuctions(activeAuctions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching active auctions:", error);
      }
    };
    fetchAuctions();
  }, []);

  if (loading) return <div className="text-gray-300">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold text-black mb-4">Active Auctions</h1>
      <AuctionList auctions={auctions} />
    </div>
  );
}
