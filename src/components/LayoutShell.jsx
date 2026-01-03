'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import Footer from './footer';

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  // Check if current path is a dashboard path
  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  return (
    <>
      {!isDashboard && <Navbar />}
      <div className={`flex-grow ${!isDashboard ? "pt-20 md:pt-24" : ""}`}>
        {children}
      </div>
      {!isDashboard && (
        <div className="w-full flex items-center justify-center">
          <Footer />
        </div>
      )}
    </>
  );
}
