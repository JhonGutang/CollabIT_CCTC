import React, { useState, useEffect, useRef } from "react";

import AvatarWithName from "../AvatarWithName";
import CreateContent from "../CreateContent";
import MessageComponent from "./Message";
import { storeMessage } from "@/services/conversationsService";
export interface User {
  id: number;
  username: string;
  email: string;
}
export interface Message {
  id: number;
  sender_id: number;
  message: string;
}

export interface UserProps {
  user: User;
  messages: Message[];
}

const Conversation: React.FC<UserProps> = ({ user, messages }) => {
  const [messageList, setMessageList] = useState<Message[]>([]);

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  const handleNewMessage = async(message: string) => {
    const newMessage = await storeMessage(message);
    setMessageList([...messageList, newMessage]);
  };

  return (
    <div className="w-full flex flex-col p-8 h-full">
      <div>
        <AvatarWithName name={user.username} />
      </div>
      <div className="h-full overflow-y-scroll my-5 rounded-xl message-container py-5">
        <div className="flex-grow flex flex-col justify-end px-10 ">
          {messageList.map((message) => (
            <div key={message.id}>
              <MessageComponent message={message} />
            </div>
          ))}
        </div>
      </div>
        <CreateContent createContent={handleNewMessage} location="conversation" />
    </div>
  );
};

export default Conversation;
