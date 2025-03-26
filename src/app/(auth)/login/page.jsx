"use client"
import React from 'react'
import Link from 'next/link'
import { loginUser } from '@/app/api/authService'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import {useRole} from "@/hooks/useRole";

function page() {
  const router = useRouter();   //to redirect the page
  const userRole = useRole();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
  
    try {
      const result = await signIn('credentials', {
        redirect: false, // Prevent automatic redirection
        email,
        password,
        role
      });
  
      if (result?.error) {
        alert(result.error || "Login Failed");
      } else {
        router.push('/');
        alert(`WELCOME ${email}`);
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.");
    }
  };
  
  
  return (
    <div>
        <form onSubmit={handleLogin}>
        <div className="w-[90dvw] md:w-[400px] mt-8 bg-green-100/10 p-4 rounded-md ">
  
          <div className="border-b border-gray-900/10">
            <h2 className="text-base/7 font-semibold text-gray-100"> Login to your account</h2>
  
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
               <div className="sm:col-span-6">
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email address"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-300">
                  Enter Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="password"
                    placeholder="Enter your password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3 w-[100%] flex justify-between gap-9">
                <div className=" cols-span-3">
                  <label htmlFor="role" className="block text-sm/6 font-medium text-gray-300">
                      Role
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                      <select
                      id="role"
                      name="role"
                      autoComplete="role-name"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                      <option> buyer</option>
                      <option> seller </option>
                      <option> admin </option>
                      </select>
                  </div>
                </div>
              </div>
            </div>          
        </div>
  
        <div className="mt-6 flex items-center justify-center md:justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-[#3dd477] px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
        </div>
        <p className="text-blue-400 py-2 text-center md:text-left"><Link href={"/register"}>Create an account</Link></p>

        </div>
      </form>
    </div>
  )
}

export default page