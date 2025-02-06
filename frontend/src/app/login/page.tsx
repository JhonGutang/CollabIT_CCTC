'use client';

import React, { useState } from 'react';
import { EyeIcon } from '@heroicons/react/20/solid';
import { createUser } from '@/services/userService';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: 'sample@gmail.com', password: '' });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(formData)
  };

  return (
    <div className="bg-white h-[100vh] flex items-center justify-center">
      <div className="border-2 border-green-600 rounded-lg w-[40vw] h-[60vh] flex flex-col items-center justify-center">
        <div className="text-black text-2xl mb-10">Login</div>
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col items-center w-80 text-black text-sm"
        >
          <div className="w-full">
            <label htmlFor="username" className="mb-1 block">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="border-2 border-black h-[50px] w-full p-2 px-4 mb-3 rounded-md"
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="password" className="mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="border-2 border-black h-[50px] w-full p-2 px-4 rounded-md"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
              >
                <EyeIcon
                  className={`h-5 w-5 text-gray-700 ${showPassword ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>
          </div>
          <div className="text-sm text-black mt-2 flex justify-end w-full">
            <button type="button" className="text-red-400">Forgot Password?</button>
          </div>
          <button 
            type="submit" 
            className="bg-green-600 text-white p-3 w-full rounded-full mt-7 hover:bg-green-800 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
