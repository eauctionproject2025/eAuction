'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import Footer from './footer';

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/admin');

  return (
    <>
      {!isDashboard && (
        <div className="w-full flex items-center justify-center border-b border-[#00000033]">
          <Navbar />
        </div>
      )}
      <div className={`w-full pb-5 flex items-center justify-center ${
        isDashboard ? 'pt-0 md:pt-0' : 'pt-15 md:pt-[100px]'
      }`}>
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
