'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname(); // Get current path

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') router.replace('/login');
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      console.log('Access denied:', session?.user?.role);
      router.replace('/login');
    }
  }, [session, status]);

  if (status === 'loading') return <div>Loading...</div>;

  // Helper to check if a link is active
  const isActive = (href) => pathname === href;

  return (
    <div className="w-full flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white pt-10 p-6 lg:pl-10 flex flex-col justify-between space-y-4">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-blue-400">BidWise</h1>
          <h2 className="text-xl font-bold mb-6 border-b">Admin Panel</h2>
          <nav className="space-y-3">
            <SidebarLink href="/admin/dashboard" label="Dashboard" active={isActive('/admin/dashboard')} />
            <SidebarLink href="/admin/dashboard/active" label="Active Auctions" active={isActive('/admin/dashboard/active')} />
            <SidebarLink href="/admin/dashboard/pending" label="Pending Auctions" active={isActive('/admin/dashboard/pending')} />
            <SidebarLink href="/admin/dashboard/ended" label="Ended Auctions" active={isActive('/admin/dashboard/ended')} />
            <SidebarLink href="/admin/dashboard/sellers" label="Seller List" active={isActive('/admin/dashboard/sellers')} />
            <SidebarLink href="/admin/dashboard/buyers" label="Buyer List" active={isActive('/admin/dashboard/buyers')} />
            <SidebarLink href="/admin/dashboard/blocked" label="Blocked Users" active={isActive('/admin/dashboard/blocked')} />
          </nav>
        </div>
        <div className="mt-10 space-y-3">
          <SidebarLink href="/" label="Home" active={isActive('/')} customColor="text-green-500" />
          <SidebarLink href="/login" label="Logout" active={isActive('/login')} customColor="text-red-500" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-10 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}

// Reusable link component
function SidebarLink({ href, label, active, customColor }) {
  return (
    <Link
      href={href}
      className={`block lg:h-10 px-2 py-1 rounded duration-200 hover:ml-1 hover:text-blue-400 
        ${customColor || ''}
        ${active ? 'bg-gray-700 text-blue-400 font-semibold' : ''}`}
    >
      {label}
    </Link>
  );
}
