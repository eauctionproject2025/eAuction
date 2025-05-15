"use client";
import React, { useState } from "react";
import { registerUser } from "@/app/api/authService";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await registerUser(formData);
      setSuccessMsg(response.msg || "Registration successful! Please login.");
      router.push("/login");
    } catch (error) {
      setErrors({ global: error.data?.msg || "Register Failed. Unable to connect to server." });
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div className="w-[90dvw] md:w-[550px] mt-8 bg-green-100/10 p-4 text-black rounded-md">
          <div className="border-b border-gray-900/10 flex flex-col justify-center items-center">
            <h2 className="text-base/7 font-semibold text-gray-100 text-xl">
              Create an account
            </h2>
            {errors.global && <p className="text-red-400 text-sm mt-2">{errors.global}</p>}
            {successMsg && <p className="text-green-400 text-sm mt-2">{successMsg}</p>}

            <div className="w-full mt-10 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-6">
              {/* First Name */}
              <div className="col-span-6 md:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-100">First name</label>
                <input id="first-name" name="first-name" type="text" required autoComplete="given-name"
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div className="col-span-6 md:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-100">Last name</label>
                <input id="last-name" name="last-name" type="text" required autoComplete="family-name"
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>

              {/* Email */}
              <div className="col-span-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-100">Email address</label>
                <input id="email" name="email" type="email" required autoComplete="email"
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* NID */}
              <div className="col-span-6">
                <label htmlFor="nid" className="block text-sm font-medium text-gray-100">NID Number</label>
                <input id="nid" name="nid" type="number" required autoComplete="nid"
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                />
                {errors.nid && <p className="text-red-500 text-xs mt-1">{errors.nid}</p>}
              </div>

              {/* Password */}
              <div className="col-span-6 md:col-span-3">
                <label htmlFor="password" className="block text-sm font-medium text-gray-100">Enter new Password</label>
                <input id="password" name="password" type="password" required autoComplete="new-password"
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="col-span-6 md:col-span-3">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-100">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" required autoComplete="new-password"
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Role Selection */}
              <div className="col-span-6 flex flex-col md:flex-row justify-between gap-9 items-center">
                <div className="flex md:flex-col items-start justify-center md:justify-start gap-4 md:gap-0">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-100">Register as</label>
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
            <button type="button" className="text-sm font-semibold text-gray-200">Cancel</button>
            <button type="submit"
              className="rounded-md bg-[#3dd477] px-3 py-2 text-sm font-semibold text-black hover:bg-green-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
            >
              Register
            </button>
          </div>

          <p className="text-gray-200 py-2 text-center md:text-left">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 underline">Login now</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
