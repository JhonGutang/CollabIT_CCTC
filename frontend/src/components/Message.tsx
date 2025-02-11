import { getUserDataFromLocal } from "@/services/userService";
import { Avatar } from "@mui/material";
import React from "react";

export interface Message {
  id: number;
  sender_id: number;
  message: string;
}

export interface MessageProps {
  message: Message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const senderId = getUserDataFromLocal()?.id;
  return (
    <div>
      {senderId === message.sender_id ? (
        <div className="flex items-center justify-end mb-3">
          <div className="me-3 message-container text-right">{message.message}</div>
          <Avatar src="https://i.pinimg.com/236x/ff/d9/b4/ffd9b46366e14141790a80d4922485bf.jpg" />
        </div>
      ) : (
        <div className="flex items-center mb-3">
          <Avatar src="https://i.pinimg.com/236x/98/cc/5f/98cc5f6b6c8c130b4f26af105e7bb21d.jpg" />
          <div className="message-container ms-3 ">{message.message}</div>
        </div>
      )}
    </div>
  );
};

export default Message;
