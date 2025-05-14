"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CountdownTimer from "@/components/CountdownTimer";

function Item() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const end = new Date(auction?.endTime);

  const { data: session } = useSession();
  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/${id}`)
        .then((res) => setAuction(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleBid = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/${id}/bid`,
        { amount: bidAmount },
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      );// reset bid amount
      setBidAmount("");
      // re-fetch auction
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/${id}`
      );
      setAuction(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  if (!auction)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  return (
    <div className="w-[90%] md:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
      {/* Left: Auction Info */}
      <div>
        <img src={auction.imageUrl} className="w-full rounded" alt="Auction" />
        <h1 className="text-2xl font-bold mt-4">{auction.title}</h1>
        <p className="text-gray-300 mt-2">{auction.description}</p>
        <p className="text-lg mt-4">Current Bid: {auction.startingBid} ৳</p>
        <p className= "mt-2"> Starts at: {new Date(auction.startTime).toLocaleString()}</p>
        <p className= "mt-2">Ends at: {new Date(auction.endTime).toLocaleString()}</p>

        <CountdownTimer startTime={auction.startTime} endTime={auction.endTime} />

        {session?.user.role === "buyer" && now < end && (
          <div className="mt-4">
            <input
              type="number"
              className="border p-2 rounded w-1/2"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter your bid"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
              onClick={handleBid}
              disabled={loading}
            >
              {loading ? "Placing..." : "Place Bid"}
            </button>
          </div>
        )}
      </div>

      {/* Right: Seller & Bidding History */}
      <div className="flex flex-col gap-9 p-4">
        <div className="mb-4 border-b border-gray-300 pb-2">
          <h2 className="text-xl font-semibold">Seller</h2>
          <p className="text-gray-300">
            {auction.seller?.username || "Unknown"}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Bidding History</h2>
          <ul className="space-y-2">
            {auction.bids
              .slice()
              .reverse()
              .map((bid, index) => (
                <li key={index} className="border p-2 rounded bg-gray-50">
                  <p className="text-sm text-gray-900 font-bold">
                    {bid.bidder?.username || "Anonymous"}
                  </p>
                  <p className="text-sm text-green-400 font-semibold">
                    Amount: ${bid.amount}
                  </p>
                  <p className="text-sm text-gray-500">
                    Time: {new Date(bid.time).toLocaleString()}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Item;
