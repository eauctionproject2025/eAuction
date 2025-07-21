"use client";
import React, { useState, useEffect } from "react";
import { registerUser } from "@/app/api/authService";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import registerAution from "@/public/bg/registerAution.jpg"
import Alert from "@/components/Alert";
import Success from "@/components/success";

function RegisterPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  const { data: session } = useSession();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; 
    setIsSubmitting(true);

    setErrors({});
    setSuccessMsg("");

    const firstName = e.target["first-name"].value.trim();
    const lastName = e.target["last-name"].value.trim();
    const name = firstName + " " + lastName;
    const email = e.target.email.value.trim();
    const nid = e.target.nid.value.trim();
    const password = e.target.password.value.trim();
    const confirmPassword = e.target.confirmPassword.value.trim();
    const role = e.target.role.value;

    const formData = {
      name,
      email,
      nid,
      role,
      password,
      username: name,
    };

    // Client-side validation
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    if (!nid) newErrors.nid = "NID is required";
    else if (nid.length !== 10) newErrors.nid = "NID must be exactly 10 digits";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!role) newErrors.role = "Please select a role";
    if (!firstName || !lastName || !email || !nid || !password || !confirmPassword || !role) {
      setShowAlert(true);
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await registerUser(formData);
      
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 1000); 
    } catch (error) {
      console.error("Registration error:", error);
      
      let errorMessage = "Registration failed. Please try again.";
      
      alert(`Registration Failed: ${errorMessage}`);
      
      setErrors({ global: errorMessage });
      
    } finally {
      // Always reset submitting state
      setIsSubmitting(false);
    }
  };

  return (<>
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
        backgroundImage: `url(${registerAution.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }} className="w-full flex items-center justify-center mt-[-15px] mb-[-20px] pt-5 pb-10">
        <form onSubmit={handleRegister}>
          {showSuccess && <Success msg="Registration successful! Please login." onClick={() => router.push('/login')} />}
          <div className="w-[90dvw] md:w-[550px] mt-8 bg-white/10 backdrop-blur-md p-4 text-black rounded-md shadow-md shadow-white/50">
            <h1 className="text-base text-center font-semibold text-white font-semibold border-b-2 border-white/70 py-2 px-3 rounded text-xl">
              Create an account
            </h1>
            <div className="border-b border-gray-900/10 flex flex-col justify-center items-center">
              {showAlert && <Alert msg="Please fill in all required fields." onClose={() => setShowAlert(false)} />}
              <div className="w-full mt-10 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-6">
                {/* First Name */}
                <div className="col-span-6 md:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-white">First name</label>
                  <input id="first-name" name="first-name" type="text" autoComplete="given-name"
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div className="col-span-6 md:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-white">Last name</label>
                  <input id="last-name" name="last-name" type="text" autoComplete="family-name"
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div className="col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium text-white">Email address</label>
                  <input id="email" name="email" type="email" autoComplete="email"
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* NID */}
                <div className="col-span-6">
                  <label htmlFor="nid" className="block text-sm font-medium text-white">NID Number</label>
                  <input id="nid" name="nid" type="number" autoComplete="nid"
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  />
                  {errors.nid && <p className="text-red-500 text-xs mt-1">{errors.nid}</p>}
                </div>

                {/* Password */}
                <div className="col-span-6 md:col-span-3">
                  <label htmlFor="password" className="block text-sm font-medium text-white">Enter new Password</label>
                  <input id="password" name="password" type="password" autoComplete="new-password"
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="col-span-6 md:col-span-3">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
                  <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password"
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                {/* Role Selection */}
                <div className="col-span-6 flex flex-col md:flex-row justify-between gap-9 items-center">
                  <div className="flex md:flex-col items-start justify-center md:justify-start gap-4 md:gap-0">
                    <label htmlFor="role" className="block text-sm font-medium text-white">Register as</label>
                    <select id="role" name="role"
                      className="mt-2 w-full rounded-md bg-white text-black py-1.5 px-1 text-base outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                    >
                      <option value="">Select Role</option>
                      <option value="buyer">Buyer</option>
                      <option value="seller">Seller</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                  </div>

                  <div className="flex flex-col md:items-left text-gray-300 justify-center md:justify-start gap-3 col-span-6 md:col-span-3 text-xs">
                    <p>- If you register as a seller, you can sell products but cannot bid.</p>
                    <p>- If you register as a buyer, you can bid on products but cannot sell.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="mt-6 flex items-center justify-center md:justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold text-red-400 hover:bg-red-300 hover:text-red-700 rounded px-3 py-2 cursor-pointer">Cancel</button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`rounded-md px-3 py-2 text-sm font-semibold text-black focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#3dd477] cursor-pointer hover:bg-green-500'
                }`}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </div>

            <p className="text-gray-300 py-2 text-center md:text-left">
              Already have an account..! {" "}
              <a href="/login" className="text-blue-600 underline">Login now</a>
            </p>
          </div>
        </form>
      </div>
    )}
    </>
  );
}

export default RegisterPage;