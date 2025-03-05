"use client";

import React, { useState } from "react";
import PasswordInput from "@/components/auth/PasswordInput";
import { loginUser, getUserDataFromLocal } from "@/services/userService";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import AuthLayout from "@/layouts/authLayout";
import Snackbar from "@/components/Snackbar";

interface LoginProps {
  toggleHandler: (auth: string) => void;
}

const Login: React.FC<LoginProps> = ({ toggleHandler }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();
  const backgroundImage = "login_bg.png";
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    state: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    toggleHandler("register");
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await loginUser(formData);
    setSnackbar(response)
    
    if(response.state === 'success') {
      setTimeout(() => {
        if(getUserDataFromLocal()?.avatarLink) {
          router.push("/home");
        } else {
          router.push('/avatar-selection')
        }
      }, 1500);
    } 
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <AuthLayout imageLink={backgroundImage}>
      <div className="text-center mb-4">
        <div className="text-black text-xl mb-4">Welcome Back!</div>
        <div className="text-black font-bold">Sign in</div>
        <div className="text-black text-sm custom-subheading">
          Join the Discussion. Expand Your Knowledge.
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-xs text-black text-sm"
      >
        <div className="w-full">
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="border-2 h-12 w-full p-2 px-4 mb-3 custom-border-radius"
            placeholder="Username"
            required
          />
        </div>
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={true}
        />
        <div className="text-sm text-black mt-2 mb-6 flex justify-end w-full">
          <button type="button" className="text-red-400">
            Forgot Password?
          </button>
        </div>
        <Button
          type="submit"
          variant="contained"
          className="text-white p-3 w-full custom-border-radius h-[5vh]"
        >
          Sign In
        </Button>
        <div className="text-sm flex mt-1">
          <div className="me-2">
            Don&apos;t have any account?
          </div>
          <div className="text-cyan-600 cursor-pointer" onClick={handleToggle}>Sign up Now!</div>
        </div>
      </form>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
        color={snackbar.state}
      />
    </AuthLayout>
  );
};

export default Login;
