import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CountdownTimer from "@/components/CountdownTimer";

function Auction({ id, imgLink, href, title, price, startTime, endTime, seller, onDelete }) {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const isOwner = currentUserId === seller;

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
      alert("Auction deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Error deleting auction");
    }
  };

  return (
    <div className="bg-green-100/50 text-black shadow-lg rounded-md overflow-hidden w-full max-w-xs">
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
        <div className="text-xl font-semibold">{title}</div>
        {session && <div className="text-lg">Current Bid: {price} ৳ </div>}
        <CountdownTimer startTime={startTime} endTime={endTime} />
        <div className="flex gap-2 items-center">
          <Link href={`/items/${id}`}>
            <button className="bg-[#3dd477] hover:bg-green-500 transition px-4 py-2 rounded-md shadow-sm">
              Bid
            </button>
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
