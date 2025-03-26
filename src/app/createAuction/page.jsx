"use client"
import { useSession } from "next-auth/react";
import AuctionForm from "@/components/auctionForm";
import Link from "next/link";

export default function CreateAuctionPage() {
  const { data: session } = useSession();

  if (!session) {
    return <div className="h-[300px] flex flex-col gap-3 items-center justify-center text-xl">
      <p> Registered <b>SELLER....!</b></p>
      <p> Yes --  <Link href={'/login'} className="text-blue-500 font-bold"> Login</Link></p>
      <p> No --  <Link href={'/register'} className="text-blue-500 font-bold"> Register</Link></p>
    </div>;
}
  if (session.user.role !== "seller") {
    return <div className="h-[300px] flex items-center justify-center text-xl text-red-400">
      <p>Only <b>SELLERS</b> can create auctions.</p>
      </div>;
  }

  return (
    <div  className="flex flex-col items-center justify-center gap-6 mt-4">
      <h1 className="text-2xl">Create Auction</h1>
      <AuctionForm />
    </div>
  );
}
 