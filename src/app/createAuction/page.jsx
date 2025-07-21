"use client"
import { useSession } from "next-auth/react";
import AuctionForm from "@/components/auctionForm";
import Link from "next/link";
import Image from "next/image";
import auctionImage from "@/public/bg/onlineAuction.jpg";

export default function CreateAuctionPage() {
  const { data: session } = useSession();

  if (!session) {
    return <div className="h-[300px] flex flex-col gap-3 items-center justify-center text-xl">
      <p> Registered as a <b>SELLER....!</b></p>
      <p> Yes --  <Link href={'/login'} className="text-blue-500 font-bold"> Login</Link></p>
      <p> No --  <Link href={'/register'} className="text-blue-500 font-bold"> Register</Link></p>
    </div>;
  }
  if (session.user.blocked) {
    return <div className="h-[300px] flex items-center justify-center text-xl text-red-400">
      <p>Your account is <b>BLOCKED</b>. Contact support for assistance.</p>
    </div>;
  }

  if (session.user.role !== "seller") {
    return <div className="h-[300px] flex items-center justify-center text-xl text-red-400">
      <p>Only <b>SELLERS</b> can create auctions.</p>
      </div>;
  }

  return (
    <div className="w-full flex items-center justify-center gap-6 pt-4 relative overflow-hidden mt-[-15px] mb-[-20px] pt-5 pb-10">
      <Image 
        src={auctionImage} 
        alt="Auction Background" 
        fill
        className="object-cover brightness-50 -z-10" 
      />
      <div className="flex items-center justify-center gap-4 w-full py-8 px-6 relative z-10">
        <AuctionForm />
      </div>
    </div>
  );
}
 