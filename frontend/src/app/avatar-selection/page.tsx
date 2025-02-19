"use client";

import { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Avatar } from "@mui/material";
import { fetchAvatars, attachAvatarToUser } from "@/services/avatarService";
import { getUserDataFromLocal, updateAvatarLinkInLocal } from "@/services/userService";
import { useRouter } from "next/navigation";
import CustomSnackbar from "@/components/Snackbar";
export interface Avatar {
  id: number;
  name: string;
  image_link: string;
}

const AvatarSelection = () => {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [user, setUser] = useState();
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const addAvatarToUser = async() => {
    if (selectedAvatar) {
      const newAvatar = await attachAvatarToUser(selectedAvatar.id);
      console.log(newAvatar);
      updateAvatarLinkInLocal(newAvatar)
      setSnackbarMessage("Avatar saved successfully! 🎉");
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push('/home')
      }, 1500);
    } else {
      setSnackbarMessage("Please select an avatar first.");
      setSnackbarOpen(true);
    }
  };
  useEffect(() => {
    const loadingAvatars = async () => {
      const avatars = await fetchAvatars();
      setAvatars(avatars);
    };

    if (getUserDataFromLocal()?.avatarLink) {
      router.push("/home");
    } else {
      loadingAvatars();
      setUser(getUserDataFromLocal()?.username);
    }
  }, []);
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[50vw] h-[80vh] bg-white custom-border-radius text-black flex flex-col items-center p-10">
        <div className="text-xl">Choose the avatar that suits you!</div>
        <div className="w-full flex flex-col gap-3 items-center my-5">
          <Avatar
            src={
              selectedAvatar
                ? selectedAvatar.image_link
                : "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg"
            }
            sx={{
              width: "140px",
              height: "140px",
              transition:
                "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
              opacity: 1,
              transform: selectedAvatar ? "scale(1)" : "scale(0.95)",
            }}
          />
          <div className="text-lg">{user}</div>
        </div>
        <div className="custom-border-radius border-2 w-full h-auto flex flex-wrap gap-3 p-5 mb-5">
          {avatars.map((avatar) => (
            <IconButton
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar)}
            >
              <Avatar
                className="border"
                sx={{
                  width: "80px",
                  height: "80px",
                  border:
                    selectedAvatar?.id === avatar.id
                      ? "3px solid green"
                      : "3px solid transparent",
                  transition: "border 0.3s ease-in-out",
                }}
                src={avatar.image_link}
              />
            </IconButton>
          ))}
        </div>
        <div>
          <Button
            onClick={addAvatarToUser}
            variant="contained"
            className="w-60 h-10 custom-border-input"
          >
            Save Avatar
          </Button>
        </div>
      </div>
      <CustomSnackbar
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default AvatarSelection;
