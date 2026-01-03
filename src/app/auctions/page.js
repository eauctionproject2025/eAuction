"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import CurrencyFormat from "@/components/currencyFormat";
import ItemSkeleton from "@/components/itemSkeleton";
import Image from "next/image";

export default function AllProducts() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, active, upcoming, ended

  useEffect(() => {
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
    fetchAuctions();
  }, []);

  const filteredAuctions = auctions.filter(item => {
      const now = new Date();
      if (filter === 'active') return new Date(item.endTime) > now && new Date(item.startTime) < now;
      if (filter === 'upcoming') return new Date(item.startTime) > now;
      if (filter === 'ended') return new Date(item.endTime) < now;
      return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      
      {/* Filter Tabs */}
      <div className="flex gap-4 mb-8 border-b dark:border-gray-700 pb-2 overflow-x-auto">
          {['all', 'active', 'upcoming', 'ended'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-t-lg font-semibold capitalize transition ${filter === f ? 'bg-blue-600 text-gray-300' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              >
                  {f}
              </button>
          ))}
      </div>

      {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>)}
          </div>
      ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAuctions.map((item) => (
               <Link key={item._id} href={`/items/${item._id}`} className="group block bg-transparent/10 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition">
                  <div className="relative h-48 w-full bg-gray-200">
                     <Image 
                        src={item.imageUrls?.[0]} 
                        alt={item.title} 
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        width={'400'}
                        height={'300'}
                    />
                     {new Date(item.endTime) < new Date() ? (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Ended</div>
                    ) : (
                        <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">Active</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold truncate">{item.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                         <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Current Bid</p>
                            <div className="text-yellow-500 font-bold"><CurrencyFormat price={item.currentBid || item.startingBid} /></div>
                        </div>
                    </div>
                  </div>
               </Link>
            ))}
            {filteredAuctions.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                    No auctions found for this category.
                </div>
            )}
          </div>
      )}
    </div>
  );
}
