'use client'

import { Button, Container } from "@mui/material";
import { Card, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Snackbar from "@/components/Snackbar";

const LeftDrawer = () => {
  const router = useRouter();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const logout = () => {
    localStorage.removeItem("userData");
    setSnackbar({ open: true, message: "Logged out successfully!" });
    setTimeout(() => {
      router.push("/auth");
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container
      sx={{
        width: "25vw",
        position: "relative", 
      }}
      className="p-5 h-full"
    >

      <div
        className="absolute inset-0 bg-black opacity-40"
        style={{ zIndex: -1 }} 
      ></div>

      <Card
        className="p-5 flex items-center mb-4 w-full"
        sx={{
          height: "10vh",
          bgcolor: "transparent",
          color: "white",
          position: "relative",
          zIndex: 1,
        }}
        
      >
        <Avatar
          src="https://i.pinimg.com/236x/1c/f2/09/1cf20978bf4f2967c5e6083e6243965b.jpg"
          className="profile-avatar me-3"
        />
        <div>User</div>
      </Card>

      <Button
        variant="contained"
        className="w-full text-start drawer-buttons"
        style={{ position: "relative", zIndex: 1 }} 
      >
        Create Post
      </Button>
      <Button
        variant="contained"
        className="w-full text-start drawer-buttons"
        style={{ position: "relative", zIndex: 1 }}
      >
        Create Post
      </Button>
      <Button
        variant="contained"
        className="w-full text-start drawer-buttons"
        style={{ position: "relative", zIndex: 1 }}
      >
        Create Post
      </Button>
      <Button
        variant="contained"
        className="w-full text-start drawer-buttons"
        style={{ position: "relative", zIndex: 1 }}
        onClick={logout}
      >
        Logout
      </Button>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
};

export default LeftDrawer;
