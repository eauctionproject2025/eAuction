"use client";

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const auctionId = searchParams.get('auction_id');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-xl text-center max-w-md">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-gray-300 mb-6">
          Your payment has been securely held. Funds will be released to the seller once you confirm receipt of the item.
        </p>
        
        <div className="flex flex-col gap-3">
          {auctionId && (
            <Link href={`/items/${auctionId}`}>
              <button className="w-full bg-blue-600 px-6 py-3 rounded font-bold hover:bg-blue-700 transition">
                Return to Auction
              </button>
            </Link>
          )}
          <Link href="/">
            <button className="w-full border border-gray-600 px-6 py-3 rounded font-semibold hover:bg-gray-700 transition">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
