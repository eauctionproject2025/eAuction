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
      <div className={`w-full pt-${isDashboard?'0':'15'} md:pt-${isDashboard? '[0px]':'[100px]'} pb-5 flex items-center justify-center`}>
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
