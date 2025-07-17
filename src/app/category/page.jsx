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
    return <div className=" w-full h-[50dvh] flex flex-cos items-center justify-center rounded">
            <p className="text-lg md:text-2xl">Loading...</p>
          </div>
  }


  return (
    <div className="w-[90%]">
        <h1 className='text-2xl font-bold mb-4 my-2 text-center'>Product Category</h1>
        {categories ? (<div className="min-h-[50vh] flex flex-wrap justify-center items-center gap-6 p-4">
            {categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
            ))}
        </div>):(
          <div className="bg-red-400 w-full h-[50dvh] flex flex-cos items-center justify-center rounded">
            <h1 className="text-lg md:text-2xl"> No Category has created </h1>
          </div>
        )}
    </div>
  )
}

export default page