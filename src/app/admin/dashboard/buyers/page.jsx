"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import UserList from '@/components/UserList';
import { getBuyers } from '../FetchUser';

export default function BuyersPage() {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedBuyers = await getBuyers();
        setBuyers(fetchedBuyers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-black font-bold mb-4">Buyer List</h1>
          <UserList users={buyers} />
    </div>
  );
}