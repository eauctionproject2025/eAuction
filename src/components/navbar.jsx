import Link from "next/link";
import React from "react";

function Navbar() {
  const menus = [
    { id:1, name: "All Auction", link: "#" },
    { id:2, name: "All Offers", link: "#" },
    { id:3, name: "Membership", link: "#" },
    { id:4, name: "F.A.Qs", link: "#" }
  ]
  return (
    <div className="w-[90%] navbar flex bg-base-100 shadow-sm items-center justify-between py-2">
      <div className="navbar-start flex flex-row-reverse md:block items-center justify-between ">
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
      </div>
    </div>
  );
}

export default Navbar;
