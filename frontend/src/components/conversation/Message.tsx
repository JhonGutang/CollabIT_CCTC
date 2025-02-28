import { getUserDataFromLocal } from "@/services/userService";
import { deleteMessage } from "@/services/conversationsService";
import { Avatar } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

export interface Message {
  id?: number;
  sender_id?: number;
  message: string;
  imageLink?: string;
}

export interface MessageProps {
  message: Message;
  removedMessage: (messageId: number) => void
}

const Message: React.FC<MessageProps> = ({ message, removedMessage }) => {
  const senderId = getUserDataFromLocal()?.id;
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });

  const messageRef = useRef<HTMLDivElement | null>(null);

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault(); 
    setContextMenu({ x: event.clientX, y: event.clientY, visible: true });
  };

  const handleDelete = () => {
    if (message.id) {
      deleteMessage(message.id);
      removedMessage(message.id)
      setContextMenu({ ...contextMenu, visible: false }); 
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (messageRef.current && !messageRef.current.contains(event.target as Node)) {
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("contextmenu", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("contextmenu", handleClickOutside);
    };
  }, []);

  return (
    <div ref={messageRef}>
      {senderId === message.sender_id ? (
        <div className="flex items-start justify-end mb-3">
          <div className="me-3 message cursor-pointer" onContextMenu={handleRightClick}>
            <div className="px-3">{message.message}</div>

            {message.imageLink && message.imageLink !== "" && (
              <div className="px-3 py-2">
                <img
                  src={message.imageLink}
                  alt=""
                  className="rounded-xl"
                  style={{ maxWidth: "350px", maxHeight: "400px" }}
                />
              </div>
            )}
          </div>
          <Avatar src="https://i.pinimg.com/236x/ff/d9/b4/ffd9b46366e14141790a80d4922485bf.jpg" className="mt-2" />
        </div>
      ) : (
        <div className="flex items-center mb-3">
          <Avatar src="https://i.pinimg.com/236x/98/cc/5f/98cc5f6b6c8c130b4f26af105e7bb21d.jpg" />
          <div className="message ms-3">{message.message}</div>
        </div>
      )}

      {contextMenu.visible && (
        <div
          className="absolute bg-white shadow-md rounded-md px-3 py-2"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button className="text-red-500 hover:text-red-700" onClick={handleDelete}>
            Delete Message
          </button>
        </div>
      )}
    </div>
  );
};

export default Message;
