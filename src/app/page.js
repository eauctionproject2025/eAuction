"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AuctionList from "@/components/AuctionList"; // Assuming this is reusable component or we create sections
import HomeSkeleton from "@/components/homeSkeleton";
import Link from "next/link";
import Image from "next/image";
import CurrencyFormat from "@/components/currencyFormat";
import Banner from "@/components/Banner";

export default function Home() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions`);
      setAuctions(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) return <HomeSkeleton />;

  const activeAuctions = auctions.filter(a => new Date(a.endTime) > new Date() && new Date(a.startTime) < new Date()).slice(0, 8);
  const upcomingAuctions = auctions.filter(a => new Date(a.startTime) > new Date()).slice(0, 8);
  const endedAuctions = auctions.filter(a => new Date(a.endTime) < new Date()).slice(0, 8);

  const AuctionCard = ({ item }) => (
    <Link href={`/items/${item._id}`} className="group relative block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition">
      <div className="relative h-48 w-full bg-gray-200">
        <img 
            src={item.imageUrls?.[0]} 
            alt={item.title} 
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        {new Date(item.endTime) < new Date() && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Ended</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">{item.title}</h3>
        <div className="flex justify-between items-center mt-2">
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Current Bid</p>
                <div className="text-blue-600 font-bold"><CurrencyFormat price={item.currentBid || item.startingBid} /></div>
            </div>
            {new Date(item.endTime) > new Date() && (
                 <div className="text-xs text-orange-600 font-semibold border border-orange-200 bg-orange-50 px-2 py-1 rounded">
                    Active
                 </div>
            )}
        </div>
      </div>
    </Link>
  );

  return (
    <div>
        {/* Banner Section */}
        <Banner />

        <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
            
            {/* Active Section */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-3xl font-bold">Active Auctions</h2>
                    <Link href="/auctions?status=active" className="text-blue-600 font-semibold hover:underline">See More</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {activeAuctions.length > 0 ? activeAuctions.map(item => <AuctionCard key={item._id} item={item} />) : <p className="text-gray-500">No active auctions at the moment.</p>}
                </div>
            </section>

             {/* Upcoming Section */}
             <section>
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-3xl font-bold">Upcoming</h2>
                    <Link href="/auctions?status=upcoming" className="text-blue-600 font-semibold hover:underline">See More</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {upcomingAuctions.length > 0 ? upcomingAuctions.map(item => <AuctionCard key={item._id} item={item} />) : <p className="text-gray-500">No upcoming auctions.</p>}
                </div>
            </section>

             {/* Ended Section */}
             <section>
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-3xl font-bold">Recently Ended</h2>
                    <Link href="/auctions?status=ended" className="text-blue-600 font-semibold hover:underline">See More</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {endedAuctions.length > 0 ? endedAuctions.map(item => <AuctionCard key={item._id} item={item} />) : <p className="text-gray-500">No ended auctions history.</p>}
                </div>
            </section>

        </div>
    </div>
  );
}
