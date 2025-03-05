"use client";
import Image from "next/image";
import { Button, Container } from "@mui/material";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Snackbar from "@/components/Snackbar";
import { getUserDataFromLocal, LocalUserData } from "@/services/userService";
import {
  LogOut,
  MessageCircleMore,
  SquarePenIcon,
  UsersRound,
} from "lucide-react";

export interface User {
  id: number;
  username: string;
  avatarLink: string;
}

const LeftDrawer = () => {
  const defaultAvatar =
    "https://i.pinimg.com/736x/b5/4f/c0/b54fc0fc3bd8a5775a08061ee30843a1.jpg";
  const router = useRouter();
  const [user, setUser] = useState<LocalUserData | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    state: "",
  });

  const logout = () => {
    localStorage.removeItem("userData");
    setSnackbar({
      open: true,
      message: "Logged out successfully!",
      state: "success",
    });
    setTimeout(() => {
      router.push("/auth");
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    if (getUserDataFromLocal()) {
      setUser(getUserDataFromLocal());
    }
  }, []);

  return (
    <Container
      sx={{
        width: "18vw",
        position: "relative",
      }}
      className=" h-full p-10 custom-base-container flex flex-col justify-between"
    >
      <div>
        <div className=" text-black h-auto mb-5 flex flex-col justify-center items-center px-5">
          <Avatar
            sx={{ width: "130px", height: "130px" }}
            className="border-2"
            src={user?.avatarLink || defaultAvatar}
          />
          <div className="text-xl my-2">{user?.username}</div>
          <Button
            variant="contained"
            fullWidth
            className="custom-border-radius"
            sx={{
              textTransform: "capitalize",
              height: "35px",
              fontSize: "13px",
            }}
          >
            View Profile
          </Button>
        </div>

        <div>
          <Button className="w-full text-start drawer-buttons">
            <SquarePenIcon className="me-3" />
            Create Post
          </Button>
          <Button
            className="w-full text-start drawer-buttons"
            onClick={() => {
              router.push("/conversation");
            }}
          >
            <MessageCircleMore className="me-3" />
            Conversations
          </Button>
          <Button className="w-full text-start drawer-buttons">
            <UsersRound className="me-3" />
            About Us
          </Button>
          <Button className="w-full text-start drawer-buttons" onClick={logout}>
            <LogOut className="me-3" />
            Logout
          </Button>
        </div>
      </div>

      <div className="flex-col flex items-center justify-center">
        <Image src="/logo.png" alt="" width={100} height={100} />
        <div className="text-sm">@2025 CollabIT CCTC</div>
        <div className="text-xs">all rights reserved</div>
      </div>

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
        color={snackbar.state}
      />
    </Container>
  );
};

export default LeftDrawer;
