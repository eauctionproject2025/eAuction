"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import CurrencyFormat from "@/components/currencyFormat";
import Link from "next/link";

export default function BuyerDashboard() {
  const { data: session } = useSession();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchData = async () => {
        try {
          // Fetch my Bids
          const { data: bidsData } = await axios.get(
             `${process.env.NEXT_PUBLIC_BACKEND_URL}api/bids/user/${session.user.id}`
          );
          
          // Process bids to find unique auctions and status
          // Group by auction
          const uniqueAuctionsMap = new Map();
          bidsData.forEach(bid => {
              if (bid.auction) {
                  const auctionId = bid.auction._id;
                  if (!uniqueAuctionsMap.has(auctionId)) {
                      uniqueAuctionsMap.set(auctionId, { ...bid.auction, myLatestBid: bid.amount });
                  } else {
                      // If I have multiple bids, ensure we track my highest? 
                      // actually the API sorts by time -1, so first one is latest.
                  }
              }
          });
          
          const uniqueAuctions = Array.from(uniqueAuctionsMap.values());
          setHistory(uniqueAuctions);
          
        } catch (error) {
          console.error("Error fetching history:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [session]);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;

  const wonAuctions = history.filter(item => {
      // Logic for won: Auction Ended AND Winner is Me (need to check if winner populated or ID match)
      // item.winner might be ID or object depending on backend populate in bid controller
      // Let's assume ID for now based on typical schema behavior unless populated
      return new Date(item.endTime) < new Date() && (item.winner === session.user.id || item.winner?._id === session.user.id);
  });

  const activeBids = history.filter(item => {
      return new Date(item.endTime) > new Date();
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Buyer Dashboard</h1>

      {/* Won Auctions Section */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Purchases & Won Auctions</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {wonAuctions.length > 0 ? (
              wonAuctions.map(auction => (
                  <div key={auction._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                      <div className="h-40 bg-gray-200 relative">
                          <img src={auction.imageUrls?.[0]} className="w-full h-full object-cover" alt={auction.title} />
                          <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">WON</div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                          <h3 className="font-bold text-lg mb-1 truncate">{auction.title}</h3>
                          <div className="text-gray-500 text-sm mb-4">
                              Win Price: <span className="text-gray-900 font-semibold"><CurrencyFormat price={auction.startingBid}/></span>
                          </div>
                          
                          <div className="mt-auto">
                              {/* Status Badges */}
                               <div className="flex gap-2 flex-wrap mb-3">
                                  <span className={`px-2 py-0.5 rounded text-xs border ${auction.paymentStatus === 'pending' ? 'border-red-200 bg-red-50 text-red-600' : 'border-green-200 bg-green-50 text-green-600'}`}>
                                      Pay: {auction.paymentStatus}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded text-xs border ${auction.shipmentStatus === 'pending' ? 'border-gray-200 bg-gray-50 text-gray-600' : 'border-blue-200 bg-blue-50 text-blue-600'}`}>
                                      Ship: {auction.shipmentStatus}
                                  </span>
                               </div>

                              <Link href={`/items/${auction._id}`}>
                                  <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition">
                                      {auction.paymentStatus === 'pending' ? 'Pay Now' : 'View Order'}
                                  </button>
                              </Link>
                          </div>
                      </div>
                  </div>
              ))
          ) : (
              <p className="text-gray-500 col-span-3">You haven't won any auctions yet.</p>
          )}
       </div>

       {/* Active Bids */}
       <h2 className="text-xl font-bold text-gray-800 mb-4">Active Bids</h2>
       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
             <thead className="bg-gray-50 text-gray-900 uppercase font-semibold">
                <tr>
                   <th className="px-6 py-3">Auction</th>
                   <th className="px-6 py-3">Ends In</th>
                   <th className="px-6 py-3">Current Price</th>
                   <th className="px-6 py-3">Your Status</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
                {activeBids.map(auction => (
                    <tr key={auction._id}>
                        <td className="px-6 py-4">
                            <Link href={`/items/${auction._id}`} className="font-medium text-blue-600 hover:underline">
                                {auction.title}
                            </Link>
                        </td>
                        <td className="px-6 py-4">{new Date(auction.endTime).toLocaleString()}</td>
                        <td className="px-6 py-4"><CurrencyFormat price={auction.startingBid}/></td>
                        <td className="px-6 py-4">
                             {/* Check if I am the highest bidder. 
                                Note: getAuctionsByUserId might not populate 'bids' fully or 'winner' if active. 
                                We assume backend sort or we check locally. 
                                For simple UI, just show "Active".
                             */}
                             <span className="text-green-600 font-semibold">Active</span>
                        </td>
                    </tr>
                ))}
             </tbody>
          </table>
          {activeBids.length === 0 && <div className="p-6 text-center text-gray-400">No active bids.</div>}
       </div>
    </div>
  );
}
