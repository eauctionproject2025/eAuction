"use client"
import Image from "next/image";
import Auction from "@/components/auction";
import searchIcon from "@/public/icon/search.svg";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Greet from '@/components/Greet';
import Skeleton from "@/components/homeSkeleton";
import CarouselSlide from "@/components/CarouselSlide";
import offer4 from "@/public/item/offer4.jpg";
import offer5 from "@/public/item/offer5.jpeg";
import search from "@/public/icon/search.svg";
import CategoryCard from "@/components/categoryCard";

const slides = [
  {
    title: 'Wholesale',
    subtitle: 'Auctions',
    description: 'Fleet, Finance & Copart Select Products',
    buttonText: 'View Inventory',
    buttonLink: '/allOffers',
    image: offer4, 
  },
  {
    title: 'Exclusive Deals',
    subtitle: 'On All Brands',
    description: 'Drive your dream today with 0% financing.',
    buttonText: 'Browse Now',
    buttonLink: '/allOffers',
    image: offer5,
  },
];
export default function Home() {
  
  const [auctions, setAuctions] = useState([]);
  const [greet, setGreet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && !sessionStorage.getItem("greeted")) {
      setGreet(true);
      sessionStorage.setItem("greeted", "true");
    }
  }, [session]);
  


  const handleDelete = (deletedId) => {
    setAuctions((prevAuctions) => prevAuctions.filter((auction) => auction._id !== deletedId));
  };
  
  useEffect(() => {
    const fetchAuctions = async () =>{
    try{
      // setLoading(true); 
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions`);
      const data = await response.json();
      setAuctions(data)
      setLoading(false);
    }catch (error) {
    console.error("Error fetching auctions:", error);
    }
  }
  fetchAuctions();
  }, []);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/categories`);
        const data = await response.json();
        setCategories(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {greet && (
        <Greet message= {`Welcome back ${session?.user.name} !`}/>
      )}
          <div className="flex-grow w-[70%] h-9 mt-3 flex md:hidden items-center border rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search auctions..."
              className="w-full px-3 py-2 focus:outline-none text-md"
            />
            <div className="bg-yellow-400 w-12 h-full flex items-center justify-center text-white hover:bg-yellow-500">
              <img src={search.src} alt="Search" className="w-5 h-full" />
            </div>
          </div>
        {loading ? (
          <Skeleton />
        ) : (
        <div className="w-full flex flex-col items-center justify-center ">
          <div className="w-[90%] relative my-5">
              {/* <Image src={offer1} alt="banner" width={1000} height={300} className="object-cover" /> */}
              <CarouselSlide slides={slides} />
          </div>
          <div className="w-[90%] flex flex-col items-left justify-between mb-5">
            <h2 className="text-lg font-bold">Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
                {categories.map((category) => (
                    <CategoryCard key={category._id} category={category} />
                ))}
              <button className="outline outline-yellow-500 text-yellow-500 px-2 w-[150px] h-[170px] rounded hover:bg-yellow-500 hover:text-white" onClick={() => window.location.href = "/category"}>
                View All Categories
              </button>
            </div>
          </div>
          <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-center justify-items-center">
            {auctions.map((auction) => (
            <Auction
              key={auction._id}
              id={auction._id}
              title={auction.title}
              price={auction.startingBid}
              href="#"
              startTime={auction.startTime}
              endTime={auction.endTime}
              imgLink={auction.imageUrls|| auction.imageUrl}
              categories={auction.categories}
              seller={auction.seller._id} 
              onDelete={handleDelete}
              publicUrl={auction.cloudUrls|| auction.cloudUrl}
            />
            ))}
          </div>
        </div>
        )}
    </div>
  );
}
