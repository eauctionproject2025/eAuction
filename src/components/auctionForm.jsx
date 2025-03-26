"use client"
import { useState } from "react";

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
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("startingBid", startingBid);
    formData.append("endTime", endTime);
    formData.append("image", image);

    const res = await fetch("/api/auctions", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Auction created!");
    } else {
      alert("Failed to create auction");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[500px] bg-[#333] rounded-md flex flex-col gap-6 p-5">
      <input
        type="text"
        placeholder="Auction Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="outline rounded-sm p-1.5"
      />
      <input
        type="text"
        placeholder="Auction Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="outline rounded-sm p-1.5"
      />
      <input
        type="number"
        placeholder="Starting Bid"
        value={startingBid}
        onChange={(e) => setStartingBid(Number(e.target.value))}
        required
        className="outline rounded-sm p-1.5"
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
        className="outline rounded-sm p-1.5"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} required 
        className="outline rounded-sm p-1.5"/>
      <button type="submit" 
      className="bg-green-600 rounded-md px-2 py-1 hover:bg-green-500 hover:text-black cursor-pointer"
      >Create Auction</button> 
    </form>
  );
}
