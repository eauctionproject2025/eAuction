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


export default function Home() {

  const { data: session } = useSession();
  
  if (session?.user?.role) {
    console.log("User Role:", session.user.role);
  } else {
    console.log("No Role Found");
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex items-center justify-center py-[20px] gap-1">
              <div className="w-[50%]">
                <input type="text" className="w-full text-black bg-gray-200 text-[12px] md:text-[15px] lg:text-[17px] p-2 pl-2 rounded-md border-0"/>
              </div>
              <div className="flex h-[60%] bg-[#B5FCCD] rounded-md p-2">
                <Image src={searchIcon} alt="search icon" className="w-[25px] md:w-[25px] cursor-pointer"/>
              </div>
            </div>
        <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
            <Auction imgLink={bike} href={"#"} title={'FZ X'} price={"3050000"}/>
            <Auction imgLink={car} href={"#"} title={'Super Car'} price={"18050000"}/>
            <Auction imgLink={house} href={"#"} title={'House'} price={"23050000"}/>
            <Auction imgLink={samsung} href={"#"} title={'Samsung s24'} price={"150000"}/>
            <Auction imgLink={bat} href={"#"} title={'Cricket Bat'} price={"10000"}/>
            <Auction imgLink={watch} href={"#"} title={'Watch'} price={"9000"}/>
            <Auction imgLink={painting} href={"#"} title={'Painting'} price={"5050000"}/>
            <Auction imgLink={bike} href={"#"} title={'FZ X'} price={"3050000"}/>
        </div>
        
    </div>
  );
}
