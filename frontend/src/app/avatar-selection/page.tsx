"use client";

import { useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Avatar } from "@mui/material";

const avatars = new Array(8).fill("https://i.pinimg.com/736x/48/6c/a0/486ca00640b169300b48e9ceacd8e401.jpg");

const AvatarSelection = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[50vw] h-[80vh] bg-white custom-border-input text-black flex flex-col items-center p-10">
        <div className="text-xl">Choose the avatar that suits you!</div>
        <div className="w-full flex flex-col gap-3 items-center my-5">
          <Avatar
            src={selectedAvatar !== null ? avatars[selectedAvatar] : avatars[0]}
            sx={{
              width: "140px",
              height: "140px",
              transition: "border 0.3s ease-in-out",
            }}
          />
          <div className="text-lg">User</div>
        </div>
        <div className="custom-border-input border-2 w-full h-auto flex flex-wrap gap-3 p-5 mb-5">
          {avatars.map((src, index) => (
            <IconButton key={index} onClick={() => setSelectedAvatar(index)}>
              <Avatar
                className="border"
                sx={{
                  width: "80px",
                  height: "80px",
                  border: selectedAvatar === index ? "3px solid green" : "3px solid transparent",
                  transition: "border 0.3s ease-in-out", 
                }}
                src={src}
              />
            </IconButton>
          ))}
        </div>
        <div>
          <Button variant="contained" className="w-60 h-10 custom-border-input">
            Save Avatar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelection;
