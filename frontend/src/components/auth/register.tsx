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
    email: "",
    password: "",
  });
  const backgroundImage =
    "https://img.freepik.com/free-vector/teamwork-people-with-puzzle-pieces_24877-54950.jpg?t=st=1739714385~exp=1739717985~hmac=54cde3bf37f33e128f631bdbaa75daa8fbdc8292b6f2a42174a903dc5e24797d&w=740";
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    toggleHandler("login");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser(formData);
      setSnackbarMessage("Registration successful!");
      setSnackbarType("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        handleToggle();
      }, 1500);
    } catch (error) {
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
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-80 text-black text-sm"
      >
        <div className="w-full">
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
            className="border-2 h-[50px] w-full p-2 px-4 mb-3 custom-border-input"
            required
          />
        </div>
        <div className="w-full">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 h-[50px] w-full p-2 px-4 mb-3 custom-border-input"
            required
          />
        </div>
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={true}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            marginTop: "20px",
            height: "5vh",
          }}
          className="p-3 w-full custom-border-input"
        >
          Sign Up
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
        position={{ vertical: "top", horizontal: "center" }}
      />
    </AuthLayout>
  );
};

export default Register;
