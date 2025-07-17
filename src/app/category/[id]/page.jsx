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
      {loading ? (
          <div className=" w-full h-[50dvh] flex flex-cos items-center justify-center rounded">
            <p className="text-lg md:text-2xl">Loading...</p>
          </div>
        ) : (
          <>
        <h1 className='text-2xl font-bold mb-4 my-2 text-center border-b-4 border-yellow-700'>Category "{categoryId}"</h1>
        {auctions.length > 0 ? (<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {auctions.map((auction) => (
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
            ))}
         </div>
         ):(
          <div className="bg-red-400 w-full h-[50dvh] flex flex-cos items-center justify-center rounded">
            <h1 className="text-lg md:text-2xl"> Products are not available in this Category </h1>
          </div>
          )}
        </>
        )}
      </div>
  )
}

export default Page