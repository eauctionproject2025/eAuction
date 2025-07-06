"use client"
import { useState, useEffect } from "react";
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuctionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const router = useRouter(); 

    useEffect(() => {
      const fetchCategories = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories`);
        const data = await res.json();
        setCategories(data);
      };
      fetchCategories();
    }, []);

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const session = await getSession();
    const token = session?.token;
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("startingBid", Number(startingBid));
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("categories[]", categoryId); 

    images.forEach((img) => {
      formData.append("images", img); 
    });
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      alert("Auction created!");
      setTitle("");
      setDescription("");
      setStartingBid("");
      setEndTime("");
      setImages([]);
      setCategoryId("");

      router.push('/'); 
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
        <label htmlFor="category" className="block text-sm/6 font-medium text-gray-100">
          Category
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="outline rounded-sm p-1.5"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
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
        <label htmlFor="startTime" className="block text-sm/6 font-medium text-gray-100">
                  Start Time
        </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
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
        <label htmlFor="images" className="block text-sm/6 font-medium text-gray-100">
                    Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
          className="outline rounded-sm p-1.5"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 rounded-md px-2 py-1 hover:bg-green-500 hover:text-black cursor-pointer"
      >
        Create Auction
      </button>
    </form>
  );
}
