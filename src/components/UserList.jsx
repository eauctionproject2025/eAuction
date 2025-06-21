'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function UserList({ users }) {
  const pathname = usePathname();
  const isBuyer = pathname.includes('/admin/dashboard/buyer');

  const [userList, setUserList] = useState(users);
  useEffect(() => {
    setUserList(users); // update local list when prop changes
  }, [users]);
  const { data: session } = useSession();

  const handleToggleBlock = async (id, blockStatus) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/users/block/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify({ block: !blockStatus }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to toggle block");

      // Update local state
      setUserList((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, blocked: !blockStatus } : user
        )
      );
    } catch (err) {
      console.error(err);
      alert('Failed to toggle user block');
    }
  };
  return (
    <>
      {userList.length > 0 ? (
        <table className="w-full border text-gray-700 border-gray-600 text-left text-sm">
      <thead className="bg-gray-100">
              <tr> 
                <th className="px-3 py-2 border">#</th>
                <th className="px-3 py-2 border">Image</th>
                <th className="px-3 py-2 border">Username</th>
                <th className="px-3 py-2 border">Email</th>
                <th className="px-3 py-2 border">Nid</th>
                <th className="px-3 py-2 border">Status</th>
                <th className="px-3 py-2 border">Action</th>
                  {/* {isBuyer && <th className="px-3 py-2 border">Total Auctions</th>} */}
                <th className="px-3 py-2 border">View</th>
              </tr>
                  
          </thead>
          <tbody>
              {userList.map((user, index) => (
                    <tr key={user._id} className="border-t">
                        <td className="px-3 py-2 border">{index + 1}</td>
                        <td className="px-3 py-2 border">
                            <img src={user.image || 'https://res.cloudinary.com/di5ieqrxb/image/upload/v1748933817/user_dl06s0.svg' } alt={user.name} className="w-10 h-10 rounded-full" />
                        </td>
                        <td className="px-3 py-2 border">{user.name}</td>
                        <td className="px-3 py-2 border">{user.email}</td>
                        <td className="px-3 py-2 border">{user.nid || 'N/A'}</td>
                        <td className="px-3 py-2 border">
                          {user.blocked ? (
                            <span className="text-red-600">Blocked</span>
                          ) : (
                            <span className="text-green-600">Active</span>
                          )}
                        </td>
                        <td className="px-3 py-2 border">
                          <button
                            onClick={() => handleToggleBlock(user._id, user.blocked)}
                            className={`cursor-pointer px-3 py-1 rounded-md text-white ${user.blocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                          >
                            {user.blocked ? 'Unblock' : 'Block'}
                          </button>
                        </td>
                        {/* {isBuyer && (
                            <td className="px-3 py-2 border">{user.auctions?.length || 0}</td>
                        )} */}
                        <td className="px-3 py-2 border">
                            <a href={`/users/${user._id}`} className="text-blue-600 hover:underline">
                                View
                            </a>
                        </td>
                    </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 py-6">
            No users found.
        </div>
        )}
    </>
    );
}
      