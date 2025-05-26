"use client"
import Image from "next/image";
import Auction from "@/components/auction";
import searchIcon from "@/public/icon/search.svg";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Greet from '@/components/Greet';
import Skeleton from "@/components/homeSkeleton";


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
            <div className="w-full flex items-center justify-center py-[20px] gap-1">
              <div className="w-[50%]">
                <input type="text" className="w-full text-black bg-gray-200 text-[12px] md:text-[15px] lg:text-[17px] p-2 pl-2 rounded-md border-0"/>
              </div>
              <div className="flex h-[60%] bg-[#B5FCCD] rounded-md p-2">
                <Image src={searchIcon} alt="search icon" className="w-[20px] md:w-[25px] cursor-pointer"/>
              </div>
            </div>
        <div className="w-full flex items-center justify-center ">
        {loading ? (
          <Skeleton />
        ) : (
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
          imgLink={auction.imageUrl}
          seller={auction.seller}
          onDelete={handleDelete}
        />
        ))}
        </div>
      )}
        </div>
        
    </div>
  );
}
