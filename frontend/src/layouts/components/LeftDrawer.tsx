"use client";

import { Button, Container } from "@mui/material";
import { faUserGroup, faMessage, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"; 
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Snackbar from "@/components/Snackbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        width: "20vw",
        position: "relative",
        border: "1px solid black",
        borderRadius: '20px',
      }}
      className=" h-full p-10"
    >
      <div className=" text-black h-auto mb-5 flex flex-col justify-center items-center px-5">
        <Avatar sx={{ width: "130px", height: "130px" }} src="https://i.pinimg.com/736x/48/6c/a0/486ca00640b169300b48e9ceacd8e401.jpg" />
        <div className="text-2xl my-2">User</div>
        <Button variant="contained" fullWidth className="custom-border-input" sx={{textTransform: 'capitalize'}}>
          View Profile
        </Button>
      </div>

      <div>
        <Button
          className="w-full text-start drawer-buttons"
          style={{ position: "relative", zIndex: 1 }}
        >
          Create Post
        </Button>
        <Button
          className="w-full text-start drawer-buttons"
          style={{ position: "relative", zIndex: 1 }}
          onClick={ () => {router.push('/conversation')}}
        >
          <FontAwesomeIcon icon={faMessage} className="me-3"/>
          Conversations
        </Button>
        <Button
          className="w-full text-start drawer-buttons"
          style={{ position: "relative", zIndex: 1 }}
        >
          <FontAwesomeIcon icon={faUserGroup} className="me-3"/>
          About Us
        </Button>
        <Button
          className="w-full text-start drawer-buttons"
          style={{ position: "relative", zIndex: 1 }}
          onClick={logout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="me-3"/>
          Logout
        </Button>
      </div>

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />
    </Container>
  );
};

export default LeftDrawer;
