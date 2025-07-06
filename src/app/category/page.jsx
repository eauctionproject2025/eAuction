"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import CategoryCard from "@/components/categoryCard";

function page() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchCategories = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories`);
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center h-[60dvh] w-full flex justify-center items-center">Loading...</div>;
  }


  return (
    <div>
        <h1 className='text-2xl font-bold mb-4 my-2 text-center'>Category Page</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
            {categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
            ))}
        </div>
        {/* here will be the auction listings for each category */}
        
    </div>
  )
}

export default page