"use client";
import AuctionList from "@/components/AuctionList";
import { useEffect, useState } from "react";
import { getEndedAuctions } from "../FetchAuctions";

export default function EndedAuctionsPage() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const auctions = await getEndedAuctions();
        const now = new Date();
        const activeAuctions = auctions.filter(auction => {
            if (!auction.startTime || !auction.endTime) return false;
            const end = new Date(auction.endTime);
            return now > end;
        });
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
      <h1 className="text-xl font-semibold text-black mb-4">Sold Auctions</h1>
      <AuctionList auctions={auctions} />
    </div>
  );
}
