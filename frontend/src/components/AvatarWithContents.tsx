import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { Ellipsis } from "lucide-react";

type Props = {
  name: string;
  id?: number;
  size?: number;
  time?: string;
  flexDirection?: "row" | "col";
  avatarLink?: string;
  content?: string;
  onMenuOpen?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AvatarWithName: React.FC<Props> = ({
  name,
  size,
  flexDirection = "row",
  avatarLink = "https://i.pinimg.com/236x/1c/f2/09/1cf20978bf4f2967c5e6083e6243965b.jpg",
  time,
  content,
  onMenuOpen,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`flex ${
        flexDirection === "col" ? "flex-col justify-center" : "items-center"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar
        src={avatarLink}
        className={`cursor-pointer ${
          flexDirection === "col" ? "mb-2" : "me-3"
        }`}
        sx={{
          width: `${size}px`,
          height: `${size}px`,
          border: "2px solid black",
        }}
      />

      {content ? (
        <div
          className="border p-2 rounded-xl bg-blue-200 break-words relative"
          style={{
            minWidth: "14vw",
            maxWidth: "20vw",
            wordWrap: "break-word",
          }}
        >
          <div className="flex justify-between items-center">
            <div className="text-xs font-semibold">{name}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm" style={{maxWidth: '16vw', wordWrap: "break-word"}}>{content}</div>
            {isHovered && (
              <button className="ms-3 cursor-pointer" onClick={onMenuOpen}>
                <Ellipsis size={18} />
              </button>
            )}
          </div>
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
