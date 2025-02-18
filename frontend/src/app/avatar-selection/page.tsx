"use client";

import { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Avatar } from "@mui/material";
import { fetchAvatars, attachAvatarToUser } from "@/services/avatarService";
import { getUserDataFromLocal } from "@/services/userService";
import { useRouter } from "next/navigation";
export interface Avatar {
  id: number,
  name: string,
  image_link: string
}

const AvatarSelection = () => {
  const router = useRouter()
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [avatars, setAvatars] = useState<Avatar[]>([])

  const addAvatarToUser = () => {
    if(selectedAvatar) {
      attachAvatarToUser(selectedAvatar.id)
    } else {
      console.log('please select an avatar');
    }
  }
  useEffect(() => {
    const loadingAvatars = async() => {
      const avatars = await fetchAvatars()
      setAvatars(avatars);
    }

    
    if(getUserDataFromLocal()?.avatarLink){
      router.push('/home')
    } else {
      loadingAvatars()

    }

    
  }, [])
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[50vw] h-[80vh] bg-white custom-border-input text-black flex flex-col items-center p-10">
        <div className="text-xl">Choose the avatar that suits you!</div>
        <div className="w-full flex flex-col gap-3 items-center my-5">
          <Avatar
            src={selectedAvatar ? selectedAvatar.image_link : ""}
            sx={{
              width: "140px",
              height: "140px",
              transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
              opacity: selectedAvatar ? 1 : 0,
              transform: selectedAvatar ? "scale(1)" : "scale(0.95)", 
            }}
          />
          <div className="text-lg">User</div>
        </div>
        <div className="custom-border-input border-2 w-full h-auto flex flex-wrap gap-3 p-5 mb-5">
          {avatars.map((avatar) => (
            <IconButton key={avatar.id} onClick={() => setSelectedAvatar(avatar)}>
              <Avatar
                className="border"
                sx={{
                  width: "80px",
                  height: "80px",
                  border: selectedAvatar?.id === avatar.id ? "3px solid green" : "3px solid transparent",
                  transition: "border 0.3s ease-in-out", 
                }}
                src={avatar.image_link}
              />
            </IconButton>
          ))}
        </div>
        <div>
          <Button onClick={addAvatarToUser} variant="contained" className="w-60 h-10 custom-border-input">
            Save Avatar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelection;
