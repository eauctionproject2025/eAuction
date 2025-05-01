import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

function Auction({ id, imgLink, href, title, price, seller, onDelete }) {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const isOwner = currentUserId === seller;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this auction?")) return;
    try {
      const res = await fetch(`/api/auctions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete auction");
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
        <Link href={href}>
          <button className="bg-[#3dd477] hover:bg-[#34c06a] transition px-4 py-2 rounded-md shadow-sm">
            Bid
          </button>
        </Link>
        {isOwner && (
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-2"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default Auction;
