"use client"
import Link from "next/link";
import React from "react";
import {useRole} from "@/hooks/useRole";
import Image from "next/image";
import { useState } from "react";
import guest from "@/public/profile/user-svgrepo-com.svg";

function Navbar() {
  const userRole = useRole();
  const menus = [
    { id:1, name: "All Auction", link: "/" },
    { id:2, name: "All Offers", link: "#" },
    { id:3, name: "Membership", link: "#" },
    { id:4, name: "F.A.Qs", link: "#" },
    { id:5, name: "Contact", link: "#" },
  ]
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-[90%] navbar flex bg-base-100 shadow-sm items-center justify-center">
     <nav className="w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">e-NILAAM</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* User Dropdown */}
          <button
            type="button"
            className="flex text-sm bg-gray-200 rounded-full cursor-pointer md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 "
          >
            <span className="sr-only">Open user menu</span>
            <Image className="w-8 h-8 rounded-full p-1" src={guest} alt="user photo" />
          </button>
          <div className="navbar-end mx-2 hidden md:block">
          <Link href={"/login"}>
            <button className="bg-gray-400 hover:bg-gray-300 hover:text-black rounded py-1 px-2"> Sign in </button>
          </Link>
          </div>
          <div className="navbar-end mx-2 hidden md:block">
          <Link href={"/register"}>
            <button className="bg-[#3dd477] hover:bg-gray-100 hover:text-[#3dd477] rounded py-1 px-2"> Sign up </button>
          </Link>
        </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`${menuOpen ? "block" : "hidden"} items-center justify-between w-full md:flex md:w-auto md:order-1`}>
          <ul className="flex flex-col items-center gap-1 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
            {menus.map((item) => (
              <li key={item.id}>
                <Link href={item.link} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  {item.name}
                </Link>
              </li>
            ))}
            <div className="navbar-end mx-2 block md:hidden">
          <Link href={"/login"}>
            <button className="bg-gray-400 hover:bg-gray-300 hover:text-black rounded py-1 px-2"> Sign in </button>
          </Link>
          </div>
          <div className="navbar-end mx-2 block md:hidden">
          <Link href={"/register"}>
            <button className="bg-[#3dd477] hover:bg-gray-100 hover:text-[#3dd477] rounded py-1 px-2"> Sign up </button>
          </Link>
        </div>
        
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
}

export default Navbar;

{/* <div className="navbar-start flex flex-row-reverse md:block items-center justify-between ">
        <div className="">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
        </div>
        <a className="btn btn-ghost text-2xl bold">e-Nilaam</a>
      </div>
      <div className="navbar-center hidden lg:flex flex items-center gap-2 text-[#fff]">
        <ul className="menu menu-horizontal px-2 flex items-center gap-4 border-r-2">
          {menus.map((menu) => (
            <Link key={menu.id} href={menu.link} className="hover:underline underline-offset-7 duration-500">
              <li className="menu-item">{menu.name}</li>
            </Link>
          ))}
          {/* {userRole === "buyer" && <Link href={"/admin"} className="hover:underline underline-offset-7 duration-500">
            <li className="menu-item">Admin</li>
          </Link>} 
        <div className="navbar-end mx-2">
          <Link href={"/login"}>
            <button className="bg-gray-400 hover:bg-gray-300 hover:text-black rounded py-1 px-2"> Sign in </button>
          </Link>
        </div>
        </ul>
        <div className="navbar-end mx-2">
          <Link href={"/register"}>
            <button className="bg-[#3dd477] hover:bg-gray-100 hover:text-[#3dd477] rounded py-1 px-2"> Sign up </button>
          </Link>
        </div>
      </div> */} 