'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AuctionList({ auctions: initialAuctions }) {
  const [auctions, setAuctions] = useState(initialAuctions);
  const pathname = usePathname();
  const isEnded = pathname.includes('/admin/dashboard/ended');
  const isPending = pathname.includes('/admin/dashboard/pending');
  const { data: session } = useSession();

const handleDelete = async (auctionId) => {
  if (!confirm("Are you sure you want to delete this auction?")) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/${auctionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`, 
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    setAuctions((prev) => prev.filter((auction) => auction._id !== auctionId));
  } catch (error) {
    console.error("Error deleting auction:", error);
    alert("Error deleting auction");
  }
};

  return (
    <>
      {auctions.length > 0 ? (
        <table className="w-full border text-gray-700 border-gray-600 text-left text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-3 py-2 border">#</th>
          <th className="px-3 py-2 border">Image</th>
          <th className="px-3 py-2 border">Title</th>
          <th className="px-3 py-2 border">
            {isPending ? 'Starting Bid' : isEnded ? 'Winning Bid' : 'Current Bid'}
          </th>
          {!isPending && (
            <th className="px-3 py-2 border">Total Bids</th>
          )}
          {isEnded && <th className="px-3 py-2 border">Winner</th>}
          <th className="px-3 py-2 border">Seller</th>
          <th className="px-3 py-2 border">
            {isPending ? 'Auction start' : isEnded ? 'Auction Ended' : 'Closing Time'}
          </th>
          <th className="px-3 py-2 border">View</th>
          <th className="px-3 py-2 border">Delete</th>
        </tr>
      </thead>
      <tbody>
        {auctions.map((auction, index) => {
          const winner = auction.winner?.username || 'No bids';
          return (
            <tr key={auction._id} className="border-t">
              <td className="px-3 py-2 border">{index + 1}</td>
              <td className="px-3 py-2 border">
                <img
                  src={auction.imageUrls[0] }
                  alt={auction.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </td>
              <td className="px-3 py-2 border">{auction.title}</td>
              <td className="px-3 py-2 border">{auction.startingBid} ৳</td>
              {!isPending && (
                <td className="px-3 py-2 border">{auction.bids?.length || 0}</td>
              )}
              {isEnded && (
                <td className="px-3 py-2 border">{winner}</td>
              )}
              <td className="px-3 py-2 border">{auction.seller?.username || 'N/A'}</td>
              <td className="px-3 py-2 border">
                {new Date(auction.endTime).toLocaleString()}
              </td>
              <td className="px-3 py-2 border">
                <a
                  href={`/items/${auction._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </a>
              </td>
              <td className="px-3 py-2 border">
                <button
                  onClick={() => handleDelete(auction._id)}
                  className="bg-red-500 hover:bg-red-600 text-white transition px-4 py-2 rounded-md shadow-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 py-6">
          No auctions found.
        </div>
    )}
    </>
  );
}
