'use client';

import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/20/solid'; // Importing only EyeIcon

export default function Login() {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white h-[92vh] flex items-center justify-center">
      <div className="border-2 border-green-600 rounded-lg w-[40vw] h-[60vh] flex flex-col items-center justify-center">
        <div className="text-black text-2xl mb-10">Login</div>
        <div className="flex flex-col items-center w-80 text-black text-sm">
          <div className="w-full">
            <div className="mb-1">Username</div>
            <input
              type="text"
              name="username"
              className="border-2 border-black h-[50px] w-full p-2 px-4 mb-3 rounded-md"
            />
          </div>
          <div className="w-full">
            <div className="mb-1">Password</div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                name="password"
                className="border-2 border-black h-[50px] w-full p-2 px-4 rounded-md"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
              >
                <EyeIcon
                  className={`h-5 w-5 text-gray-700 ${showPassword ? 'rotate-180' : ''}`} // Rotate the icon when password is visible
                />
              </button>
            </div>
          </div>
          <div className="text-sm text-black mt-2 flex justify-end w-full">
            <button className="text-red-400">Forgot Password</button>
          </div>
          <button className="bg-green-600 text-white p-3 w-full rounded-full mt-7 hover:bg-green-800 focus:outline-none">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
