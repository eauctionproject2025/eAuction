"use client"
import React from "react";
import { registerUser } from "@/app/api/authService";
import { useRouter } from 'next/navigation';

function RegisterPage() {
  const router = useRouter(); // for redirecting the page

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target["first-name"].value + " " + e.target["last-name"].value;
    const email = e.target.email.value.trim();
    const nid = parseInt(e.target.nid.value);
    const password = e.target.password.value.trim();
    const confirmPassword = e.target.confirmPassword.value.trim();
    const role = e.target.role.value;

    // store all the data in formData
    const formData = {
      name: name,
      email: email,
      nid: nid,
      role: role,
      password: password,
      username: e.target["first-name"].value + e.target["last-name"].value,
    };

    // check if all fields are filled
    if (!name || !email || !nid || !password || !role) {
      alert("All fields must be filled");
      return;
    }
    if (nid.length < 10 || nid.length > 10) {
      alert("NID number must be 10 digit");
      return;
    }
    // make sure password is at least 6 characters
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    // match both passwords
    if (password !== confirmPassword) {
      alert("Password does not match");
      return;
    }
    try {
      const response = await registerUser(formData); // register function from authService
      alert(response.msg || "Registration successful! please login");
      router.push('/login');
    } catch (error) {
      alert(error.data?.msg || 'Register Failed, not able to connect to server');
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

            <div className="w-full mt-10 grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-6">
              <div className="col-span-6 md:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-300"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="Asem"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-6 md:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-medium text-gray-300"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    required
                    autoComplete="family-name"
                    placeholder="Rashed"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-700 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-300"
                >
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

              <div className="col-span-6">
                <label
                  htmlFor="nid"
                  className="block text-sm/6 font-medium text-gray-300"
                >
                  NID Number
                </label>
                <div className="mt-2">
                  <input
                    id="nid"
                    name="nid"
                    type="number"
                    required
                    autoComplete="nid"
                    placeholder="Enter your NID number"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="col-span-6 md:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-300"
                >
                  Enter new Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="text"
                    required
                    autoComplete="password"
                    placeholder="Enter Password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="col-span-6 md:col-span-3">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm/6 font-medium text-gray-300"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="text"
                    required
                    autoComplete="confirmPassword"
                    placeholder="Confirm Password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 w-[100%] flex justify-between gap-9">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <label
                    htmlFor="role"
                    className="block text-sm/6 font-medium text-gray-300"
                  >
                    Register as a : 
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
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center  justify-center md:justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#3dd477] px-3 py-2 text-sm font-semibold text-black shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>

          <p className="text-gray-200 py-2 text-center md:text-left">
            Alrady have an account..!{" "}
            <a href="/login" className="text-blue-400">
              Login now
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
