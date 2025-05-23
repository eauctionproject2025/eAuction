"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import guest from "@/public/profile/user.svg";

function Navbar() {
  const router = useRouter();
  const params = useParams();
  const menus = [
    { id: 1, name: "All Auction", link: "/" },
    { id: 2, name: "All Offers", link: "#" },
    { id: 3, name: "Membership", link: "#" },
    { id: 4, name: "Add Auction", link: "/createAuction" },
    { id: 5, name: "Contact", link: "#" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session } = useSession();
  const id = session?.user?.id;
  const userId = id;
  console.log('userId', userId);

  const handleSignOut = () => {
    sessionStorage.removeItem("greeted");
    signOut();
  };

  return (
    <div className="w-full shadow-sm bg-base-100">
      <nav className="max-w-screen-xl mx-auto px-4 py-2 md:h-18 lg:h-25 flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold">e-NILAAM</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          {menus.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className="hover:text-green-500"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile/User Icon */}
        {session? (
          <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer hidden md:block"
          >
            <Image
              src={session?.user?.image || guest}
              alt="user"
              width={30}
              height={30}
            />
          </button>

          {/* Dropdown from user icon */}
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50 p-2">
              
                <>
                  <Link
                    href={`/profile/${userId}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-900"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-400"
                  >
                    Sign out
                  </button>
                </>
            </div>
          )}
        </div>):(
            <div className="hidden md:flex space-x-4">
              <button
            className=" px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => router.push("/login")}
          >
            Sign in
          </button>
          <button className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-600"
            onClick={() => router.push("/register")}
          >
            Sign up
          </button>
            </div>

        )}

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-4"
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
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 border-t">
          <ul className="flex flex-col space-y-2 mt-2">
            {menus.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className="block py-2 px-4 hover:bg-gray-100 hover:text-green-500"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <hr className="my-2" />
            {session ? (
              <>
                <Link
                  href={`/profile/${userId}`}
                  className="block py-2 px-4 hover:bg-gray-100 hover:text-green-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-4 text-red-400 hover:bg-gray-100 "
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 px-4 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="block py-2 px-4 hover:bg-gray-100"
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
