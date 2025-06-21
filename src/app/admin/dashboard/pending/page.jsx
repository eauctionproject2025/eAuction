"use client";
import AuctionList from "@/components/AuctionList";
import { useEffect, useState } from "react";
import { getPendingAuctions } from "../FetchAuctions";

export default function PendingAuctionsPage() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const auctions = await getPendingAuctions();
        const now = new Date();
        const pendingAuctions = auctions.filter(auction => {
            if (!auction.startTime || !auction.endTime) return false;
            const start = new Date(auction.startTime);
            return now < start;
        });
        setAuctions(pendingAuctions);
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
      <h1 className="text-xl font-semibold text-black mb-4">Pending Auctions</h1>
      <AuctionList auctions={auctions} />
    </div>
  );
}
