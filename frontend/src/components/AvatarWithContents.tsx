import { Avatar } from "@mui/material";
import React from "react";

type Props = {
  name: string;
  size?: number;
  time?: string;
  flexDirection?: "row" | "col";
  avatarLink?: string;
  content?: string;
};

const AvatarWithName: React.FC<Props> = ({
  name,
  size,
  flexDirection = "row",
  avatarLink = "https://i.pinimg.com/236x/1c/f2/09/1cf20978bf4f2967c5e6083e6243965b.jpg",
  time,
  content,
}) => {
  return (
    <div
      className={`flex cursor-pointer ${
        flexDirection === "col" ? "flex-col justify-center" : "items-center"
      }`}
    >
      <Avatar
        src={avatarLink}
        className={flexDirection === "col" ? "mb-2" : "me-3"}
        sx={{
          width: `${size}px`,
          height: `${size}px`,
          border: "2px solid black",
        }}
      />

      {content ? (
        <div
          className="border p-2 rounded-xl bg-blue-200 break-words"
          style={{ minWidth: "14vw", maxWidth: "17vw", wordWrap: "break-word" }}
        >
          <div className="text-xs font-semibold">{name}</div>
          <div className="text-sm">{content}</div>
        </div>
      ) : (
        <div>
          <div className="font-semibold">{name}</div>
          {time && <div className="text-xs">2 mins ago</div>}
        </div>
      )}
    </div>
  );
};

export default AvatarWithName;
