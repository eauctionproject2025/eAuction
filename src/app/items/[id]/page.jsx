"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CountdownTimer from "@/components/CountdownTimer";
import CurrencyFormat from "@/components/currencyFormat";
import ItemSkeleton from "@/components/itemSkeleton"; 
import winner from '@/public/icon/ended.svg'

function Item() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bids, setBids] = useState([]);

    const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % auction.imageUrls.length);
  };
  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? auction.imageUrls.length - 1 : prev - 1
    );
  };
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const end = new Date(auction?.endTime);
  const start = new Date(auction?.startTime);
  const { data: session } = useSession();

  useEffect(() => {
    if (id) {
      // Fetch Auction
      axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/${id}`)
      .then((res) => {
        console.log('sfdsd', res.data)
        setAuction(res.data);
        setLoading(false); 
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); 
      });

      // Fetch Bids
      fetchBids();
    }
  }, [id]);

  const fetchBids = async () => {
      try {
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/bids/auction/${id}`);
          setBids(data);
      } catch (error) {
          console.error("Failed to fetch bids", error);
      }
  };
  

  const handleBid = async () => {
    setError("");

    if (bidAmount <= (auction?.currentBid || auction?.startingBid)) {
      setError("Bid amount must be greater than the Current bid.");
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/bids/auction/${id}`,
        { amount: bidAmount,
          currentBid: auction?.currentBid,
          startingBid: auction?.startingBid
         },
        {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        }
      ); // reset bid amount
      setBidAmount("");
      // re-fetch auction & bids
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/${id}`
      );
      setAuction(res.data);
      fetchBids();
    } catch (err) {
      console.error(err);
      setError( err.response?.data?.message || "Failed to place bid. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center my-5">
    {loading ? (
      <ItemSkeleton /> 
    ) : (
          <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 gap-9">
      {/* Left: Auction Info */}
      <div className="shadow-md shadow-gray-700 p-3 rounded-md">
              {auction?.imageUrls?.length > 1 ? (
                <div className="relative w-full overflow-hidden rounded">
                  <img
                    src={auction.imageUrls[currentIndex]}
                    alt={`auction-${currentIndex}`}
                    className="w-full rounded"
                  />
                  {/* Navigation Buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute cursor-pointer w-6 h-6 font-bold text-xl pb-1.5 flex items-center justify-center left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute cursor-pointer w-6 h-6 font-bold text-xl pb-1.5 flex items-center justify-center right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                  >
                    ›
                  </button>
                </div>
              ) : (
                <img
                    src={auction?.imageUrls[0]}
                    alt={`auction-${currentIndex}`}
                    className="w-full rounded"
                  />
              )}
        <h1 className="text-2xl font-bold mt-4">{auction?.title}</h1>
        <p className="text-gray-600 mt-2">{auction?.description}</p>
        <div className="text-lg mt-4">
          Current Bid: <CurrencyFormat price={auction?.currentBid || auction?.startingBid} /> $
        </div>
        <p className="mt-2">
          {" "}
          Starts at: {new Date(auction?.startTime).toLocaleString()}
        </p>
        <p className="mt-2">
          Ends at: {new Date(auction?.endTime).toLocaleString()}
        </p>

        <CountdownTimer
          startTime={auction?.startTime}
          endTime={auction?.endTime}
        />
        {now > end && auction?.winner && (
          <div className="mt-4 p-4 border rounded glass">
             <div className="text-green-500 text-lg font-semibold mb-2">
               <img src={winner.src} className="w-7 h-7 inline-block mr-2" alt="Winner" />
               Winner : {auction?.winner?.username || "Unknown"}
             </div>

             {session?.user?.id === auction?.winner._id && (
               <div className="flex flex-col gap-3">
                 {/* 1. Payment Pending -> Pay Now */}
                 {auction.paymentStatus === 'pending' && (
                   <button
                     onClick={async () => {
                       try {
                         const { data } = await axios.post(
                           `${process.env.NEXT_PUBLIC_BACKEND_URL}api/payments/create-checkout-session`,
                           { auctionId: id },
                           { headers: { Authorization: `Bearer ${session.token}` } }
                         );
                         window.location.href = data.url;
                       } catch (err) {
                         console.error("Payment Error", err);
                         alert("Failed to start payment");
                       }
                     }}
                     className="bg-accent text-white px-6 py-2 rounded shadow hover:bg-yellow-600 transition font-bold"
                   >
                     Pay Now
                   </button>
                 )}

                 {/* 2. Payment Held -> Confirm Receipt */}
                 {auction.paymentStatus === 'payment_held' && (
                   <div className="flex flex-col gap-2">
                     <p className="text-sm text-yellow-300">
                       Payment is held securely. Please confirm when you receive the item.
                     </p>
                     <button
                       onClick={async () => {
                         if (!confirm("Have you received the item and are satisfied? This will release funds to the seller.")) return;
                         try {
                           const { data } = await axios.post(
                             `${process.env.NEXT_PUBLIC_BACKEND_URL}api/payments/confirm-delivery`,
                             { auctionId: id },
                             { headers: { Authorization: `Bearer ${session.token}` } }
                           );
                           alert("Funds released to seller!");
                           // Check if response data is valid before updating logic
                           // Simple reload to refresh status
                           window.location.reload();
                         } catch (err) {
                           console.error("Confirmation Error", err);
                           alert("Failed to confirm delivery");
                         }
                       }}
                       className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition font-bold"
                     >
                       Confirm Receipt of Item
                     </button>
                   </div>
                 )}

                 {/* 3. Completed */}
                 {auction.paymentStatus === 'completed' && (
                   <div className="text-green-400 font-bold border border-green-500 p-2 rounded text-center">
                     Transaction Completed
                   </div>
                 )}
               </div>
             )}
          </div>
        )}

        {now > end && !auction?.winner && (
          <div className="text-red-600 font-semibold mt-2">
            No bids were placed.
          </div>
        )}

        {session?.user.role === "buyer" && !session?.user.blocked && now > start && now < end && (
          <div className="mt-4">
            <input
              type="number"
              className="border p-2 rounded w-1/2"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter your bid"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 ml-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
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
          <a className="text-blue-500 hover:text-blue-600 font-semibold"  href={`/profile/${auction?.seller?._id}`}>
            {auction?.seller?.username || "Unknown"}
          </a>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Bidding History</h2>
          <ul className="space-y-2">
            {bids ? (
              bids.map((bid, index) => {
                const isBlocked = bid.bidder?.blocked; 
                return (
                  <li
                    key={index}
                    className={`p-2 rounded ${isBlocked ? 'bg-red-100' : 'bg-gray-200'} shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <a
                      className={`text-sm ${isBlocked ? 'text-black cursor-not-allowed' : 'text-blue-500 hover:text-gray-700'} font-bold`}
                      href={isBlocked ? '/#' : `/profile/${bid.bidder?._id}`}
                    >
                       {bid.bidder?.username || "Anonymous"}
                    </a>
                    <div className="text-sm text-green-400 font-semibold">
                      Amount: <CurrencyFormat price={bid.amount} /> $
                    </div>
                    <p className="text-sm text-gray-500">
                      Time: {new Date(bid.time).toLocaleString()}
                    </p>
                  </li>
                );
              })
            ) : (
                <p className="text-gray-500 text-sm">No bids yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
    )
    }
  </div>
  )
}

export default Item
