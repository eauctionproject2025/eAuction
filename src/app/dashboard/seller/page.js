"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import CurrencyFormat from "@/components/currencyFormat";
import Link from "next/link";

export default function SellerDashboard() {
  const { data: session } = useSession();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stats
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [pendingPayouts, setPendingPayouts] = useState(0);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/user/${session.user.id}`
      );
      setAuctions(data);
      calculateStats(data);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchData();
    }
  }, [session, fetchData]);


  const calculateStats = (data) => {
      let earned = 0;
      let pending = 0;
      data.forEach(item => {
          // Check payment status from model enums
          const amount = item.currentBid * 0.95; // Rough estimate or use transaction data if fetched
          if (item.paymentStatus === 'completed') earned += amount;
          if (item.paymentStatus === 'payment_held') pending += amount;
      });
      setTotalEarnings(earned);
      setPendingPayouts(pending);
  }

  const handleShipment = async (auctionId) => {
      try {
          const { data } = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/${auctionId}/ship`,
              {},
              { headers: { Authorization: `Bearer ${session.token}` } }
          );
          alert(data.message);
          fetchData(); // Refresh
      } catch (err) {
          console.error(err);
          alert(err.response?.data?.message || "Shipment update failed");
      }
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Dashboard...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
           <h3 className="text-gray-500 text-sm uppercase font-semibold">Total Auctions</h3>
           <p className="text-3xl font-bold text-gray-800">{auctions.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
           <h3 className="text-gray-500 text-sm uppercase font-semibold">Ready to Payout</h3>
           <p className="text-3xl font-bold text-yellow-600"><CurrencyFormat price={pendingPayouts}/></p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
           <h3 className="text-gray-500 text-sm uppercase font-semibold">Total Earnings</h3>
           <p className="text-3xl font-bold text-green-600"><CurrencyFormat price={totalEarnings}/></p>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">My Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 uppercase font-semibold">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3">Shipment</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {auctions.map((auction) => (
                <tr key={auction._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                      <Link href={`/items/${auction._id}`} className="font-medium text-blue-600 hover:underline">
                        {auction.title}
                      </Link>
                  </td>
                  <td className="px-6 py-4"><CurrencyFormat price={auction.startingBid}/></td>
                  <td className="px-6 py-4">
                      {new Date(auction.endTime) < new Date() ? (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Ended</span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Active</span>
                      )}
                  </td>
                  <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${auction.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 
                            auction.paymentStatus === 'payment_held' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}
                      `}>
                          {auction.paymentStatus?.replace('_', ' ')}
                      </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${auction.shipmentStatus === 'delivered' ? 'bg-green-100 text-green-800' : 
                            auction.shipmentStatus === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}
                      `}>
                          {auction.shipmentStatus}
                      </span>
                  </td>
                  <td className="px-6 py-4">
                      {auction.paymentStatus === 'payment_held' && auction.shipmentStatus === 'pending' && (
                          <button 
                            onClick={() => handleShipment(auction._id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 shadow-sm"
                          >
                              Mark Shipped
                          </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {auctions.length === 0 && <div className="p-6 text-center text-gray-400">No auctions found.</div>}
        </div>
      </div>
    </div>
  );
}
