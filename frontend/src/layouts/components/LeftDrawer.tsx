"use client";

import { Button, Container } from "@mui/material";
import { faUserGroup, faMessage, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"; 
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Snackbar from "@/components/Snackbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserDataFromLocal, isUserAuthenticated } from "@/services/userService";

export interface User {
  id: number,
  username: string,
  avatarLink: string,
}

const LeftDrawer = () => {
  const router = useRouter();
  const [user, setUser] = useState<isUserAuthenticated | null>(null);
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

  useEffect(() => {
    if(getUserDataFromLocal()){
      const userData = getUserDataFromLocal()
      console.log(userData);
      setUser(userData)
    }
  }, [])

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
        <Avatar sx={{ width: "130px", height: "130px" }} src={user?.avatarLink} />
        <div className="text-2xl my-2">{user?.username}</div>
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
