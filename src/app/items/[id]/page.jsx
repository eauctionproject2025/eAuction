"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CountdownTimer from "@/components/CountdownTimer";
import CurrencyFormat from "@/components/currencyFormat";
import ItemSkeleton from "@/components/itemSkeleton"; 
import sell from '@/public/icon/auction.svg'

function Item() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const end = new Date(auction?.endTime);
  const start = new Date(auction?.startTime);
  const { data: session } = useSession();

  useEffect(() => {
    if (id) {
      axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/${id}`)
      .then((res) => {
        setAuction(res.data);
        setLoading(false); 
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); 
      });

    }
  }, [id]);
  const handleBid = async () => {
    setError("");

    if (bidAmount <= auction.startingBid) {
      setError("Bid amount must be greater than the Current bid.");
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/${id}/bid`,
        { amount: bidAmount },
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      ); // reset bid amount
      setBidAmount("");
      // re-fetch auction
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/${id}`
      );
      setAuction(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to place bid. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
    {loading ? (
      <ItemSkeleton /> 
    ) : (
          <div className="w-[90%] lg:w-[80%] lg:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-9 pt-6">
      {/* Left: Auction Info */}
      <div className="shadow-md shadow-gray-700 p-3 rounded-md">
        <img src={auction.imageUrl} className="w-full rounded" alt="Auction" />
        <h1 className="text-2xl font-bold mt-4">{auction.title}</h1>
        <p className="text-gray-300 mt-2">{auction.description}</p>
        <div className="text-lg mt-4">
          Current Bid: <CurrencyFormat price={auction.startingBid} /> ৳
        </div>
        <p className="mt-2">
          {" "}
          Starts at: {new Date(auction.startTime).toLocaleString()}
        </p>
        <p className="mt-2">
          Ends at: {new Date(auction.endTime).toLocaleString()}
        </p>

        <CountdownTimer
          startTime={auction.startTime}
          endTime={auction.endTime}
        />
        {now > end && auction?.winner && (
          <div className="text-green-400 text-lg font-semibold mt-2">
            <img src={sell.src} className="w-5 h-5 inline-block mr-2" alt="Winner" />
            Winner : {auction.winner?.username || "Unknown"}
          </div>
        )}

        {now > end && !auction?.winner && (
          <div className="text-red-600 font-semibold mt-2">
            No bids were placed.
          </div>
        )}

        {session?.user.role === "buyer" && now > start && now < end && (
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
            {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
          </div>
        )}
      </div>

      {/* Right: Seller & Bidding History */}
      <div className="lg:w-[80%] flex flex-col lg:ml-[20%] gap-9 p-4">
        <div className="mb-4 border-b border-gray-300 pb-2">
          <h2 className="text-xl font-semibold">Seller</h2>
          <a className="text-blue-300 hover:text-blue-200 font-semibold"  href={`/profile/${auction.seller?._id}`}>
            {auction.seller?.username || "Unknown"}
          </a>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Bidding History</h2>
          <ul className="space-y-2">
            {auction.bids
              .slice()
              .reverse()
              .map((bid, index) => (
                <li key={index} className=" p-2 rounded bg-gray-200">
                  <a className={`text-sm text-gray-700 hover:text-gray-900 font-bold`} href={`/profile/${bid.bidder?._id}`}>
                    {bid.bidder?.username || "Anonymous"}
                  </a>
                  <div className="text-sm text-green-400 font-semibold">
                    Amount: <CurrencyFormat price={bid.amount} /> ৳
                  </div>
                  <p className="text-sm text-gray-500">
                    Time: {new Date(bid.time).toLocaleString()}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
    )
    }
  </div>
  )
}

export default Item;
