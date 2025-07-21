"use client"
import { useState, useEffect } from "react";
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Alert from "./Alert";

export default function AuctionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [maximumDuration, setMaximumDuration] = useState(false);
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

  const handleEndTime = (e) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime); // Update the state immediately for better UX
    
    try {
      const startDate = new Date(startTime);
      const endDate = new Date(newEndTime);
      
      // Reset alerts first
      setShowAlert(false);
      setMaximumDuration(false);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        // Invalid date input
        return;
      }

      const duration = endDate - startDate;
      const maxDuration = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

      if (endDate <= startDate) {
        setShowAlert(true);
        setEndTime('');
      } else if (duration > maxDuration) {
        setMaximumDuration(true);
      }
    } catch (error) {
      console.error("Date parsing error:", error);
    }
  };

  //when maximum duration alert is closed, reset endTime
  useEffect(() => {
    if (maximumDuration) {
      setEndTime(''); // Reset endTime when alert is closed
    }
  }, [maximumDuration]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

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
   <form onSubmit={handleSubmit} className="w-[350px] md:w-[500px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-md shadow-md shadow-white/40">
      <h1 className="text-2xl px-4 py-2 text-white rounded font-semibold border-b-2 border-white/20 text-center">Add Product</h1>
      <fieldset disabled={isSubmitting} className="flex flex-col gap-6 p-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="block text-sm/6 font-medium text-white">
                Title
          </label>
        <input
          type="text"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-white/90 text-gray-800 placeholder-gray-400 border-none rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-yellow-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="block text-sm/6 font-medium text-white">
                Description
          </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="bg-white/90 text-gray-800 placeholder-gray-400 border-none rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-yellow-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="block text-sm/6 font-medium text-white">
          Category
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="outline rounded-sm p-1.5 bg-white/90 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-300"
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
        <label htmlFor="bid" className="block text-sm/6 font-medium text-white">
                  Starting Bid
        </label>
        <input
          type="number"
          value={startingBid}
          onChange={(e) => setStartingBid(Number(e.target.value))}
          required
          className="outline rounded-sm p-1.5 bg-white/90 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="startTime" className="block text-sm/6 font-medium text-white">
                  Start Time
        </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="outline rounded-sm p-1.5 bg-white/90 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="endTime" className="block text-sm/6 font-medium text-white">
                  End Time
        </label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={handleEndTime}
          required
          className="outline rounded-sm p-1.5 bg-white/90 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-300"
        />
      </div>
      {showAlert && (
        <Alert msg="Ending time must be after starting time" onClose={() => setShowAlert(false)} />
      )}
      {maximumDuration && (
        <Alert msg="Maximum auction duration is 7 days" onClose={() => setMaximumDuration(false)} />
      )}
      
      <div className="flex flex-col gap-2">
        <label htmlFor="images" className="block text-sm/6 font-medium text-white">
                    Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
          className="outline rounded-sm p-1.5 bg-white/90 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-300 cursor-pointer"
        />
      </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-600 text-white transition transition-200 cursor-pointer"
        >
          {isSubmitting ? "Creating Auction..." : "Create Auction"}
        </button>
      </fieldset>
    </form>
  );
}
