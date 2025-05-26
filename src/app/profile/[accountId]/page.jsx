"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import guest from "@/public/profile/user.svg";
import ProfileSkeleton from "@/components/profileSkeleton";
import Link from "next/link";

export default function ProfilePage() {
  const { accountId: userId } = useParams();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  // Edit Mode States
  const [editMode, setEditMode] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: userData } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/${userId}`
        );
        setUser(userData);
        setDescription(userData.description || "");
        setAddress(userData.address || "");

        const session = await getSession();
        setIsOwner(session?.user?.id === userId);

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

  // Handle form submit
  const handleUpdate = async () => {
    try {
      let imageUrl = user.image;
      const session = await getSession();
      const token = session?.token;
      // Upload image if new one is selected
      if (newImage) {
        const formData = new FormData();
        formData.append("image", newImage);

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}api/uploads`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        imageUrl = data.url;
      }

      // Update user info
      const { data: updatedUser } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/${userId}`,
        {
          image: imageUrl,
          description,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setUser(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <>
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <div className="w-[80%] md:[90%] lg:w-[70%] grid grid-cols-1 md:grid-cols-2 pt-7 gap-4">
          {/* Profile Header */}
          <div className="profile-header flex flex-col gap-3 lg:gap-5 items-start justify-top shadow-md shadow-gray-700 rounded-md p-4">
            <Image
              src={
                newImage
                  ? URL.createObjectURL(newImage)
                  : user.image || guest
              }
              alt={`${user.name}'s profile`}
              width={150}
              height={150}
              className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] shadow-md shadow-gray-700 p-1"
              style={{ borderRadius: "50%" }}
            />

            {isOwner && (
              <>
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-sm bg-gray-600 text-blue-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <label htmlFor="image" className="text-sm text-gray-100 mt-3">
                          Change Profile picture
                    </label>
                    <input
                      className="w-full border p-2 rounded text-sm"
                      name="image"
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewImage(e.target.files[0])}
                    />

                    <label htmlFor="description" className="text-sm text-gray-100 mt-3">
                          Update Description
                    </label>
                    <textarea
                      className="w-full border p-2"
                      name="description"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    <label htmlFor="address" className="text-sm text-gray-100 mt-3">
                          Update Address
                    </label>
                    <input
                      type="text"
                      className="w-full border p-2"
                      name="address"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />

                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="bg-gray-400 text-black px-4 py-2 rounded cursor-pointer hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            
            <p className={`text-lg ${user.role === 'seller'? 'text-yellow-400':'text-green-300'} font-semibold uppercase`}>{user.role}</p>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            {user.description && (
              <p className="">Bio: {user.description}</p>
            )}
            {isOwner && <p className=""> {user.email}</p>}
            {user.address && !editMode && (
              <p className="">Address: {user.address}</p>
            )}
          </div>

          {/* Auction History */}
          <div className="profile-history lg:w-[80%] felx flex-col lg:ml-[20%] mt-4">
            <h2 className="text-xl font-semibold mb-1">
              {user.role === "seller" ? "Selling History" : "Bidding History"}
            </h2>
            <hr/>
            {history.length > 0 ? (
              <ul className="mt-6 flex flex-col space-y-4">
                {history.map((auction) => (
                  <Link href={`/items/${auction._id}`} key={auction._id}>
                    <li className="p-4 border hover:border-gray-700 rounded-md">
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
                  </Link>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-4">No history found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
