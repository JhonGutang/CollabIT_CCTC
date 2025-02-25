"use client";

import { Button } from "@mui/material";
import AvatarWithName from "../AvatarWithName";
import { motion } from "framer-motion";

interface UserProfilesProps {
  username: string,
  avatarLink?: string,
}
const UserProfiles:React.FC<UserProfilesProps> = ({username, avatarLink}) => {
  return (
    <motion.div
      className="bg-white w-[40vw] border-2 h-auto rounded-xl text-black p-5 flex flex-col gap-4 shadow-xl backdrop-blur-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full h-max flex mb-3">
        <div className="flex-1 flex items-center justify-center">
          <AvatarWithName name={username} size={80} flexDirection="col" avatarLink={avatarLink} />
        </div>
        <div className="border flex-2 custom-border-radius p-4">
            <div>Full Name:  </div>
            <div>Email: </div>
            <div>Year Level: </div>
        </div>
      </div>

      <div className="">
        <Button variant="contained" className="custom-border-radius" sx={{width: '170px'}}>
            Add Friend
        </Button>
      </div>
    </motion.div>
  );
};

export default UserProfiles;
