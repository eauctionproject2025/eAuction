import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CountdownTimer from "@/components/CountdownTimer";
import CurrencyFormat from "@/components/currencyFormat";

function Auction({ id, imgLink, href, title, price, startTime, endTime, seller, onDelete }) {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const isOwner = currentUserId === seller;

  const now = new Date();
  const end = new Date(endTime);
  const start = new Date(startTime);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this auction?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
        credentials: "include",
      });
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
      <div className="relative w-full h-48">
        <Image
          src={imgLink}
          alt="auction"
          fill
          className="object-cover p-2 rounded-md"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col items-center gap-2">
        <div className="text-xl font-semibold  text-white">{title}</div>
        {session && <div className="lg:text-lg md:text-md  text-white">Current Bid: <CurrencyFormat price = {price}/> ৳ </div>}
        <CountdownTimer startTime={startTime} endTime={endTime} />
        <div className="flex gap-2 items-center">
          <Link href={`/items/${id}`}>
            {session?.user.role=== "buyer" && now > start && now < end ? (
              <button className="bg-blue-600 hover:bg-blue-700 text-white transition px-4 py-2 rounded-md shadow-sm cursor-pointer">
                Place Bid
              </button>
            ) : (
              <button className="bg-gray-500 hover:bg-gray-600 text-white transition px-4 py-2 rounded-md shadow-sm cursor-pointer" >
                Place Bid
              </button>
            )}
          </Link>
          {isOwner && (
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
