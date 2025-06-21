"use client";
import { useState, useEffect } from 'react';
import UserList from '@/components/UserList';
import { getBlockedUsers } from '../FetchUser';

export default function BlockedUserPage() {
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedBlockedUsers = await getBlockedUsers();
        setBlockedUsers(fetchedBlockedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchData();
  }, []);
  const blockedSellers = blockedUsers.filter(user => user.role === 'seller');
  const blockedBuyers = blockedUsers.filter(user => user.role === 'buyer');
  return (
    <div className="p-4 flex flex-col gap-7">
      <h1 className="text-2xl text-black font-bold mb-4">Blocked User List</h1>
      <div>
        <h2 className="text-xl text-black font-bold mb-2 underline text-blue-800">Sellers</h2>
        <UserList users={blockedSellers} />
      </div>
      <div>
        <h2 className="text-xl text-black font-bold mb-2 underline text-green-800">Buyers</h2>
        <UserList users={blockedBuyers} />
      </div>
    </div>
  );
}