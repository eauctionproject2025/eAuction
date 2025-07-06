"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import Auction from "@/components/auction";
import { usePathname } from 'next/navigation';

function Page() {

    const pathname = usePathname();
    const categoryId = pathname.split("/")[2]; // Get category ID from URL
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = (deletedId) => {
        setAuctions((prevAuctions) => prevAuctions.filter((auction) => auction._id !== deletedId));
    };

    useEffect(() => {
    const fetchAuctions = async () => {
        try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions`);
        const data = await response.json();
        const filtered = data.filter(auction => {
          return auction.categories && auction.categories.some(category => category.name === categoryId);
        });
        console.log("Filtered Auctions:", data) // Debugging line to check filtered results
        setAuctions(filtered);
        setLoading(false);
        } catch (error) {
        console.error("Error fetching auctions:", error);
        setLoading(false);
        }
    };
    fetchAuctions();
    }, [categoryId]);

  return (
    <div className="w-[90%] flex flex-col items-center justify-center">
      <h1 className='text-2xl font-bold mb-4 my-2 text-center'>{categoryId}</h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {loading ? (
          <p className="text-center h-12">Loading...</p>
        ) : (
          auctions.map((auction) => (
            <Auction
              key={auction._id}
              id={auction._id}
              title={auction.title}
              price={auction.startingBid}
              href="#"
              startTime={auction.startTime}
              endTime={auction.endTime}
              imgLink={auction.imageUrls || auction.imageUrl}
              seller={auction.seller}
              onDelete={handleDelete}
              publicUrl={auction.cloudUrls || auction.cloudUrl}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Page