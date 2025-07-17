"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import Alert from '@/components/Alert';
import auctionBg from "@/public/bg/logInAuction.jpeg";

function page() {
  const router = useRouter();   
  const [error, setError] = useState(""); 
  const [showAlert, setShowAlert] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session } = useSession();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
  
    try {
      const result = await signIn('credentials', {
        redirect: false, // Prevent automatic redirection
        email,
        password,
        role,
      });
  
      if (result?.error) {
        setError('Invalid credentials. Please try again.');
        e.target.email.value = "";
        e.target.password.value = ""; 
      }else if( role === "admin" && result?.ok) {
        router.push('#'); ///admin/dashboard
      }else {
        router.push('/');
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  
  
  return (
    <>
      {session?.user ? (
        <div className='w-full h-full flex items-center justify-center'>
          <div className='w-[90%] md:w-[60%] lg:w-[50%] h-[500px] text-center flex flex-col items-center justify-center'>
            <div>
              You are already logged in. <br />
              Move to{' '}
              <a href={`/profile/${session.user.id}`} className='text-blue-400'>
                Profile
              </a>
            </div>
          </div>
        </div>) : (
        <div style={{
          backgroundImage: `url(${auctionBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} className="w-full flex items-center justify-center mt-[-15px] mb-[-20px] pt-5 pb-10">

          <form onSubmit={handleLogin}>
            <div className="w-[90dvw] md:w-[400px] mt-8 bg-white/10 backdrop-blur-md p-4 text-black rounded-md shadow-md shadow-white/50">
              {error && showAlert && (
                <Alert
                  msg={error}
                  onClose={() => setShowAlert(false)}
                />
              )}
              <div className="border-b border-gray-900/10 ">
                <h1 className="text-xl border-b-2 pb-2 border-white font-semibold text-center text-white"> Login to your account</h1>
  
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                      Enter Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
              
                  <div className="flex flex-col items-start justify-center md:justify-start sm:col-span-6">
                    <label htmlFor="role" className="block text-sm font-medium text-white">Role</label>
                    <select id="role" name="role"
                      className="mt-2 w-[110px] rounded-md bg-white text-black py-1.5 px-1 text-sm md:text-md outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                    >
                      <option value="">Select Role</option>
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                    </select>
                  </div>
                </div>
              </div>
  
              <div className="mt-6 flex items-center justify-center md:justify-end gap-x-6">
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
              <p className="text-blue-400 py-2 text-center md:text-left"><Link href={"/register"}>Create an account</Link></p>

            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default page