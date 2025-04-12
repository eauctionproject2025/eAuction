"use client"
import { useState } from "react";
import { getSession } from 'next-auth/react';

export default function AuctionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const session = await getSession();
    console.log("Session ::", session);
    const token = session?.token;
    console.log("Token ::", token);
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("startingBid", Number(startingBid));
    formData.append("endTime", endTime);
    if (image) {
      formData.append("image", image);
    }
  
    const res = await fetch('http://localhost:5000/api/auctions', {
      method: 'POST',
      body: formData,
      credentials: 'include' // ✅ IMPORTANT!
    });
    
  
    const data = await res.json();
    console.log(data);
  
    if (res.ok) {
      alert("Auction created!");
      setTitle("");
      setDescription("");
      setStartingBid("");
      setEndTime("");
      setImage(null);
    } else {
      alert("Failed to create new auction");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[500px] bg-[#00000033] rounded-md flex flex-col gap-6 p-5">
      
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="block text-sm/6 font-medium text-gray-100">
              Title
        </label>
        <input
          type="text"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="outline rounded-sm p-1.5"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="block text-sm/6 font-medium text-gray-100">
                Description
          </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="outline rounded-sm p-1.5"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="bid" className="block text-sm/6 font-medium text-gray-100">
                  Starting Bid
        </label>
        <input
          type="number"
          value={startingBid}
          onChange={(e) => setStartingBid(Number(e.target.value))}
          required
          className="outline rounded-sm p-1.5"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="endTime" className="block text-sm/6 font-medium text-gray-100">
                  End Time
        </label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="outline rounded-sm p-1.5"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="image" className="block text-sm/6 font-medium text-gray-100">
                    Image
        </label>
        <input type="file" accept="image/*" onChange={handleImageChange} required 
          className="outline rounded-sm p-1.5"/>
      </div>

      <button type="submit" 
      className="bg-green-600 rounded-md px-2 py-1 hover:bg-green-500 hover:text-black cursor-pointer"
      >Create Auction</button> 
    </form>
  );
}
