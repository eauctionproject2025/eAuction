"use client"
import Image from "next/image";
import Link from "next/link";
import {useRole} from "@/hooks/useRole";
import Auction from "@/components/auction";
import car from "@/public/item/car1.jpg";
import watch from "@/public/item/watch.jpg";
import samsung from "@/public/item/samsung.jpeg";
import bat from "@/public/item/bat.jpeg";
import house from "@/public/item/house.jpeg";
import bike from "@/public/item/bike.jpeg";
import painting from "@/public/item/painting.jpeg";
import searchIcon from "@/public/icon/search.svg";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {

  const { data: session } = useSession();
  
  const [auctions, setAuctions] = useState([]);

  const handleDelete = (deletedId) => {
    setAuctions((prevAuctions) => prevAuctions.filter((auction) => auction._id !== deletedId));
  };
  
  useEffect(() => {
    const fetchAuctions = async () =>{
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/auctions`);
      const data = await response.json();
      setAuctions(data)
    }catch (error) {
    console.error("Error fetching auctions:", error);
    }
  }
  fetchAuctions();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-center py-[20px] gap-1">
              <div className="w-[50%]">
                <input type="text" className="w-full text-black bg-gray-200 text-[12px] md:text-[15px] lg:text-[17px] p-2 pl-2 rounded-md border-0"/>
              </div>
              <div className="flex h-[60%] bg-[#B5FCCD] rounded-md p-2">
                <Image src={searchIcon} alt="search icon" className="w-[20px] md:w-[25px] cursor-pointer"/>
              </div>
            </div>
        <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
        {auctions.map((auction) => (
        <Auction
          key={auction._id}
          id={auction._id}
          title={auction.title}
          price={auction.startingBid}
          href="#"
          imgLink={auction.imageUrl}
          seller={auction.seller}
          onDelete={handleDelete}
  />
))}

        </div>
        
    </div>
  );
}
