"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CountdownTimer from "@/components/CountdownTimer";
import CurrencyFormat from "@/components/currencyFormat";
import { useEffect, useState } from "react";

function Auction({
  id,
  imgLink = [],
  categories,
  href,
  title,
  price,
  startTime,
  endTime,
  seller,
  onDelete,
}) {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const isOwner = currentUserId === seller;
  const admin = session?.user?.role == "admin";

  // Inside your component:
  const [now, setNow] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % imgLink.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? imgLink.length - 1 : prev - 1
    );
  };
  

  useEffect(() => {
    setNow(new Date());
  }, []);

  const end = new Date(endTime);
  const start = new Date(startTime);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this auction?")) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.token}`,
          },
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to delete auction", res);
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error(error);
      alert("Error deleting auction");
    }
  };

  return (
    <div className="bg-gray-100/10 text-black shadow-md shadow-gray-800 rounded-md overflow-hidden w-full max-w-xs">
      {/* Image Wrapper */}
      <div className="relative w-full h-48 overflow-hidden rounded-md">
      {imgLink.length > 1 ? (
        <>
          <Image
            src={imgLink[currentIndex]}
            alt={`auction-${currentIndex}`}
            fill
            className="object-cover p-2 rounded-md transition duration-300"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          />
          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute cursor-pointer font-bold w-5 h-5 flex items-center justify-center left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute cursor-pointer font-bold w-5 h-5 flex items-center justify-center right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
          >
            ›
          </button>
        </>
      ) : (
        <Image
            src={imgLink[currentIndex]}
            alt={`auction-${currentIndex}`}
            fill
            className="object-cover p-2 rounded-md transition duration-300"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          />
      )}
    </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col items-center gap-2">
        <div className="text-xl font-semibold ">{title}</div>
        {session && (
          <div className="lg:text-lg md:text-md">
            Current Bid: <CurrencyFormat price={price} /> ৳{" "}
          </div>
        )}
        <CountdownTimer startTime={startTime} endTime={endTime} />
        <div className="flex gap-2 items-center">
          {now && (
            <Link href={`/items/${id}`}>
              {session?.user.role === "buyer" ? (
                <button className={`bg-${now > start && now < end ? "blue-600" : "gray-500"} hover:bg-${now > start && now < end ? "blue-700" : "gray-600"} text-white transition px-4 py-2 rounded-md shadow-sm cursor-pointer`}>
                  Place Bid
                </button>
              ) : (
                <button className="bg-gray-500 hover:bg-gray-600 text-white transition px-4 py-2 rounded-md shadow-sm cursor-pointer">
                  View Details
                </button>
              )}
            </Link>
          )}

          {(isOwner || admin) && (
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white  transition px-4 py-2 rounded-md shadow-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auction;
