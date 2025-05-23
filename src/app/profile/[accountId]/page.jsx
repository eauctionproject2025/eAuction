"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSession } from "next-auth/react"; // Import NextAuth client utility
import axios from "axios";
import Image from "next/image";
import guest from "@/public/profile/user.svg";

export default function ProfilePage() {
  const { accountId: userId } = useParams(); // Extract userId from the route
  const [user, setUser] = useState(null); // Store user details
  const [history, setHistory] = useState([]); // Store auction history
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false); // Check if the logged-in user is viewing their own profile

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // Fetch user details
        const { data: userData } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/${userId}`
        );
        setUser(userData);

        // Check if the logged-in user is the profile owner
        const session = await getSession(); // Use NextAuth's getSession utility
        setIsOwner(session?.user?.id === userId);

        // Fetch auction history (selling or bidding)
        const { data: auctionHistory } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions/user/${userId}`
        );
        setHistory(auctionHistory);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>User not found</p>;

  return (
    <div className="w-[80%] flex">
      {/* Profile Header */}
      <div className="profile-header h-[400px] w-[60%] flex flex-col gap-9 items-center justify-center rounded-md p-4">
        <Image
          src={user.image || guest} // Fallback to default image
          alt={`${user.name}'s profile`}
          className="profile-image"
          width={100}
          height={100}
          style={{ borderRadius: "50%" }}
        />
        <h1 className="text-2xl font-bold">{user.name}</h1>
        {isOwner && <p className="text-lg">Email: {user.email}</p>}
        <p className="text-lg">Role: {user.role}</p>
      </div>

      {/* Auction History */}
      <div className=" profile-history mt-6">
        <h2 className="text-xl font-semibold">
          {user.role === "seller" ? "Selling History" : "Bidding History"}
        </h2>
        {history.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {history.map((auction) => (
              <li key={auction._id} className="p-4 border rounded-md">
                <h3 className="text-lg font-bold">{auction.title}</h3>
                <p className="text-gray-900">
                  Ends at: {new Date(auction.endTime).toLocaleString()}
                </p>
                {user.role === "buyer" && (
                  <p className="text-green-500">
                    Your Bid: {auction.yourBid || "No bid placed"}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No history found.</p>
        )}
      </div>
    </div>
  );
}