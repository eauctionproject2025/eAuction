"use client";
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function AdminDashboard() {
  const { data: session } = useSession();

  // Admin features likely need more API endpoints (e.g. all transactions)
  // For now, we'll placeholder the structure

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Platform Overview</h2>
            <p>Total Revenue: <span className="text-green-600 font-bold">$0.00</span> (Coming Soon)</p>
            <p>Active Users: 0</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-2">
                <Link href="/admin/users" className="text-blue-600 hover:underline">Manage Users</Link>
                <Link href="/admin/auctions" className="text-blue-600 hover:underline">Manage Auctions</Link>
            </div>
        </div>
      </div>
    </div>
  );
}
