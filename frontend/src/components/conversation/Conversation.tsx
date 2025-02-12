import React, { useState, useEffect, useRef } from "react";

import AvatarWithName from "./AvatarWithName";
import CreateMessage from "./CreateMessage";
import MessageComponent from "./Message";
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

  const handleNewMessage = (message: Message) => {
    console.log(message);
    setMessageList([...messageList, message]);
  };

  return (
    <div className="w-full flex flex-col p-8 h-full">
      <div>
        <AvatarWithName name={user.username} />
      </div>
      <div className="h-full border overflow-y-scroll">
        <div className="flex-grow flex flex-col justify-end px-10 ">
          {messageList.map((message) => (
            <div key={message.id}>
              <MessageComponent message={message} />
            </div>
          ))}
        </div>
      </div>
        <CreateMessage updateMessages={handleNewMessage} />
    </div>
  );
};

export default Conversation;
