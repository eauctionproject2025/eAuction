"use client";

import { useEffect, useState } from "react";
import SummaryCard from "@/components/summeryCard";
import seller from "@/public/icon/seller.svg";
import buyer from "@/public/icon/buyer.svg";
import active from "@/public/icon/active.svg";
import ended from "@/public/icon/ended.svg";
import pending from "@/public/icon/pending.svg";
import total from "@/public/icon/total.svg";
import blocked from "@/public/icon/blocked.svg";
import AuctionList from "@/components/AuctionList";
import {
  getActiveAuctions,
  getEndedAuctions,
  getPendingAuctions,
} from "./FetchAuctions";
import { getSellers, getBuyers, getBlockedUsers } from "./FetchUser";

export default function DashboardPage() {
  const [data, setData] = useState({
    activeAuctions: [],
    endedAuctions: [],
    pendingAuctions: [],
    sellers: [],
    buyers: [],
    blockedUsers: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [
          activeAuctions,
          endedAuctions,
          pendingAuctions,
          sellers,
          buyers,
          blockedUsers,
        ] = await Promise.all([
          getActiveAuctions(),
          getEndedAuctions(),
          getPendingAuctions(),
          getSellers(),
          getBuyers(),
          getBlockedUsers(),
        ]);

        setData({
          activeAuctions,
          endedAuctions,
          pendingAuctions,
          sellers,
          buyers,
          blockedUsers,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      }
    }

    fetchAllData();
  }, []);

  const { activeAuctions, endedAuctions, pendingAuctions, sellers, buyers, blockedUsers } = data;

  const auctions = activeAuctions.slice(0, 5);

  if (loading) return <div className="p-4 text-gray-600">Loading dashboard...</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl text-gray-600 font-semibold pt-3">Auction Summary</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <SummaryCard label="Active auctions" link="/admin/dashboard/active" value={activeAuctions.length || '0'} icon={active} color="green-500" />
        <SummaryCard label="Auctions ended" link="/admin/dashboard/ended" value={endedAuctions.length || '0'} icon={ended} color="red-500" />
        <SummaryCard label="Pending Auctions" link="/admin/dashboard/pending" value={pendingAuctions.length || '0'} icon={pending} color="blue-500" />
        <SummaryCard label="Total Auctions" link="/admin/dashboard/#" value={(activeAuctions.length || 0) + (endedAuctions.length || 0) + (pendingAuctions.length || 0)} icon={total} color="gray-500" />
      </div>

      <h1 className="text-xl text-gray-600 font-semibold pt-3">User Summary</h1> 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <SummaryCard label="Total Seller" link="/admin/dashboard/sellers" value={sellers.length || '0'} icon={seller} color="green-500" />
        <SummaryCard label="Total Buyer" link="/admin/dashboard/buyers" value={buyers.length || '0'} icon={buyer} color="blue-500" />
        <SummaryCard label="Blocked Users" link="/admin/dashboard/blocked" value={blockedUsers.length || '0'} icon={blocked} color="red-500" />
      </div>

      <div>
        <h1 className="text-xl text-gray-600 font-semibold py-3">Active Auctions</h1>
        <AuctionList auctions={auctions} />
      </div>
    </div>
  );
}
