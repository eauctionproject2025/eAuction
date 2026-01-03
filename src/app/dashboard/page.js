"use client";
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import guest from "@/public/profile/user.svg";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return <div className="p-4">Loading...</div>;
  }

  const user = session.user;

  return (
    <div className="max-w-4xl mx-auto">
       <h1 className="text-3xl font-bold mb-6">My Profile</h1>
       
       <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
          <div className="p-8 flex flex-col items-center border-r border-gray-100">
             <Image
                src={user.image || guest}
                alt="Profile"
                width={150}
                height={150}
                className="rounded-full shadow-md object-cover"
             />
             <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
             <span className={`px-3 py-1 rounded-full text-sm font-semibold mt-2 ${user.role === 'seller' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'} uppercase`}>
                {user.role}
             </span>
          </div>
          
          <div className="p-8 flex-1">
             <div className="grid grid-cols-1 gap-6">
                <div>
                   <label className="block text-sm font-medium text-gray-500">Email</label>
                   <p className="text-lg text-gray-900">{user.email}</p>
                </div>
                {user.stripeAccountId && (
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Stripe Account</label>
                        <p className="text-lg text-green-600 font-mono">Connected</p>
                    </div>
                )}
                 {/* Redirect Button */}
                 <div className="pt-4">
                    <button 
                        onClick={() => router.push(`/profile/${user.id}`)}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                        View Public Profile
                    </button>
                 </div>
             </div>
          </div>
       </div>
    </div>
  );
}
