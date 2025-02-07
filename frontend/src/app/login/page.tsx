'use client';

import React, { useState } from 'react';
import PasswordInput from '@/components/passwordInput'; 
import { createUser } from '@/services/userService';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', email: 'sample@gmail.com', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(formData);
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
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={true}
          />
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
