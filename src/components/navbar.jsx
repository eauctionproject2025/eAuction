"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/context/ThemeContext";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import guest from "@/public/profile/user.svg";
import search from "@/public/icon/search.svg";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const router = useRouter();

  const menus = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "All Products", link: "/auctions" },
    { id: 3, name: "Membership", link: "#" },
    { id: 4, name: "Add Auction", link: "/createAuction" },
    { id: 5, name: "Contact", link: "#" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  }
 
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const role = session?.user?.role;

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem("greeted");
    signOut();
    router.push("/");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 bg-gray-600 shadow transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Row */}
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between gap-2 h-14 md:flex-nowrap flex-row">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold text-yellow-500">
          BidWise
        </Link>

        {/* Search Bar (hidden on mobile) */}
        <div className="flex-grow h-7 md:h-9  lg:max-w-lg flex items-center border rounded-md overflow-hidden">
          <form onSubmit={handleSearch} className="text-white flex w-full h-full flex items-center justify-between">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="md:flex-grow pl-2 md:pl-3 w-[90%] py-1 md:py-2 outline-none text-sm md:text-md"
            />
            <div className="bg-yellow-400 w-8 md:w-11 p-1.5 h-full flex items-center justify-center cursor-pointer text-white hover:bg-yellow-500">
              <Image src={search} alt="Search" className="w-5 h-5" onClick={handleSearch} />
            </div>
          </form>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-4"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              {theme === 'light' ? '☀️' : '🌙'}
          </button>

          {session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-yellow-500 cursor-pointer"
              >
                <Image
                  src={session?.user?.image || guest}
                  alt="user"
                  width={30}
                  height={30}
                />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-md z-50 p-2 text-gray-900 dark:text-gray-100">
                  <Link 
                    href="/dashboard" 
                    className="block px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer mb-1 border-b dark:border-gray-700 font-bold"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={`/profile/${userId}`}
                    className="block px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="px-3 py-1.5 text-sm bg-yellow-500 text-white rounded text-semibold hover:bg-yellow-400 hover:text-gray-700 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Sign in
              </button>
              <button
                className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-gray-900 cursor-pointer"
                onClick={() => router.push("/register")}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Second Sticky Row (Desktop Menu) */}
      <div className="hidden md:block sticky top-14 bg-gray-700 z-40">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex text-white/80 justify-center md:justify-start space-x-6 overflow-x-auto">
          {menus.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="hover:text-yellow-400 whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 border-t bg-white">
          <ul className="flex flex-col space-y-2 mt-2">
            {menus.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className="block py-2 px-4 hover:bg-gray-200 hover:text-orange-500"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <hr className="my-2" />
            {role === "admin" ? (
              <Link
                href="/admin/dashboard"
                className="block py-2 px-4 hover:bg-gray-100 hover:text-orange-600 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : session ? (
              <>
                <Link
                  href={`/profile/${userId}`}
                  className="block py-2 px-4 hover:bg-gray-100 hover:text-green-500 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-4 text-red-400 hover:bg-gray-100 cursor-pointer"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="block py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
