"use client";

import { Button, Container } from "@mui/material";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Snackbar from "@/components/Snackbar";
import { getUserDataFromLocal, isUserAuthenticated } from "@/services/userService";
import { LogOut, MessageCircleMore, SquarePenIcon, UsersRound } from "lucide-react";

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
        width: "18vw",
        position: "relative",
      }}
      className=" h-full p-10 custom-base-container"
    >
      <div className=" text-black h-auto mb-5 flex flex-col justify-center items-center px-5">
        <Avatar sx={{ width: "130px", height: "130px" }} className="border-2" src={user?.avatarLink} />
        <div className="text-xl my-2">{user?.username}</div>
        <Button variant="contained" fullWidth className="custom-border-radius" sx={{textTransform: 'capitalize', height: '35px', fontSize: '13px'}}>
          View Profile
        </Button>
      </div>

      <div>
        <Button
          className="w-full text-start drawer-buttons"
        >
          <SquarePenIcon className="me-3"/>
          Create Post
        </Button>
        <Button
          className="w-full text-start drawer-buttons"
          onClick={ () => {router.push('/conversation')}}
        >
          <MessageCircleMore className="me-3"/>
          Conversations
        </Button>
        <Button
          className="w-full text-start drawer-buttons"
        >
          <UsersRound className="me-3"/>
          About Us
        </Button>
        <Button
          className="w-full text-start drawer-buttons"
          onClick={logout}
        >
          <LogOut className="me-3"/>
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
