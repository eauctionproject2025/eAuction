"use client";
import { useState, useEffect } from 'react';
import UserList from '@/components/UserList';
import { getSellers } from '../FetchUser';

export default function SellersPage() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedSellers = await getSellers();
        setSellers(fetchedSellers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-2xl text-black font-bold mb-4">Seller List</h1>
      <UserList users={ sellers} />
    </div>
  );
}