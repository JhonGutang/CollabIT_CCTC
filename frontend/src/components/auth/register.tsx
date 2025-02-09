'use client';

import React, { useState } from 'react';
import PasswordInput from '@/components/PasswordInput'; 
import { createUser } from '@/services/userService';
import { Button } from '@mui/material';
import Snackbar from '@/components/Snackbar'; 

interface ToggleProps {
  toggleHandler: (auth: string) => void;
}

const Register: React.FC<ToggleProps> = ({ toggleHandler }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success'); // To differentiate message types

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    toggleHandler('login');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser(formData); 
      setSnackbarMessage('Registration successful!');
      setSnackbarType('success');
      setSnackbarOpen(true);
      setTimeout(() => {
        handleToggle()
      }, 1500);
    } catch (error) {
      setSnackbarMessage('Registration failed. Please try again.');
      setSnackbarType('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="bg-white h-[100vh] flex items-center justify-center">
      <div className="border-2 border-green-600 rounded-lg w-[40vw] h-[60vh] flex flex-col items-center justify-center">
        <div className="text-black text-2xl mb-10">Register</div>
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
            <label htmlFor="email" className="mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
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
          <button
            type="submit"
            className="bg-green-600 text-white p-3 w-full rounded-full mt-7 hover:bg-green-800 focus:outline-none"
          >
            Register
          </button>
          <Button onClick={handleToggle}>
            Login
          </Button>
        </form>
      </div>


      <Snackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        position={{ vertical: 'top', horizontal: 'center' }}
      />
    </div>
  );
};

export default Register;
