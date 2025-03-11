"use client";

import React, { useState } from "react";
import PasswordInput from "@/components/auth/PasswordInput";
import { createUser } from "@/services/userService";
import { Button } from "@mui/material";
import Snackbar from "@/components/Snackbar";
import AuthLayout from "@/layouts/authLayout";
interface ToggleProps {
  toggleHandler: (auth: string) => void;
}

const Register: React.FC<ToggleProps> = ({ toggleHandler }) => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    yearLevel: 0,
    email: "",
    password: "",
  });
  const backgroundImage =
    "register_bg.png";
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [form, setForm] = useState(1);
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success"
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formToggle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(form === 2) {
      handleSubmit()
    } else {
      setForm(form + 1);
    }
  };

  const handleToggle = () => {
    toggleHandler("login");
  };

  const handleSubmit = async () => {
    try {
      await createUser(formData);
      setSnackbarMessage("Registration successful!");
      setSnackbarType("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        handleToggle();
      }, 1500);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Registration failed. Please try again.");
      setSnackbarType("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <AuthLayout imageLink={backgroundImage}>
      <div className="mb-4 text-black text-center">
        <div className=" text-xl font-semibold mb-2">Sign Up Now!</div>
        <div className="text-sm custom-subheading">
          Join the Discussion. Expand Your Knowledge.
        </div>
      </div>
      <form
        onSubmit={formToggle}
        className="flex flex-col items-center w-80 text-black text-sm"
      >
        {form === 1 ? (
          <div className="w-full">
            <div className="w-full">
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                placeholder="First Name"
                onChange={handleInputChange}
                className="border-2 h-[50px] w-full p-2 px-4 mb-3 custom-border-radius"
                required
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                onChange={handleInputChange}
                className="border-2 h-[50px] w-full p-2 px-4 mb-3 custom-border-radius"
                required
              />
            </div>
            <div className="w-full">
              <input
                type="number"
                name="yearLevel"
                id="yearLevel"
                value={formData.yearLevel}
                placeholder="Year level (1-4)"
                onChange={(e) => {
                  const value = Math.max(1, Math.min(4, Number(e.target.value)));
                  setFormData({ ...formData, yearLevel: value });
                }}
                className="border-2 h-[50px] w-full p-2 px-4 mb-3 custom-border-radius"
                required
                min={1}
                max={4}
              />
            </div>
            <div className="w-full">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="border-2 h-[50px] w-full p-2 px-4 mb-3 custom-border-radius"
                required
              />
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="w-full">
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                placeholder="Username"
                onChange={handleInputChange}
                className="border-2 h-[50px] w-full p-2 px-4 mb-3 custom-border-radius"
                required
              />
            </div>
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required={true}
            />
          </div>
        )}
        <Button
          variant="contained"
          type="submit"
          sx={{
            marginTop: "20px",
            height: "5vh",
          }}
          className="p-3 w-full custom-border-radius"
        >
          {form === 1 ? "Next" : "Register"}
        </Button>
        <div className="text-sm flex mt-1">
          <div className="me-1">Already have an account?</div>
          <div className="cursor-pointer text-cyan-600" onClick={handleToggle}>
            Sign in Now!
          </div>
        </div>
      </form>
      <Snackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        color={snackbarType}
        position={{ vertical: "top", horizontal: "center" }}
      />
    </AuthLayout>
  );
};

export default Register;
