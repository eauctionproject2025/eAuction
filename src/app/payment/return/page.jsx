"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ReturnPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to profile after a short delay
    const timeout = setTimeout(() => {
      // We assume user is logged in, redirect to their profile or dashboard
      // Since we don't know the exact ID here easily without session, let's go to homepage or handle dynamically
      // For now, let's just go home, user can navigate to profile
      router.push('/');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-xl text-center">
        <h1 className="text-3xl font-bold text-green-400 mb-4">Onboarding Complete!</h1>
        <p className="text-gray-300 mb-6">You have successfully connected your Stripe account.</p>
        <p className="text-sm text-gray-500">Redirecting you back...</p>
        <button 
          onClick={() => router.push('/')}
          className="mt-4 bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
