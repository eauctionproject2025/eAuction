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
              imgLink={auction.imageUrls|| auction.imageUrl} // all auction's image not in array
              seller={auction.seller}
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
