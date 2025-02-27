import React, { useState, useEffect } from "react";
import AvatarWithName from "../AvatarWithContents";
import CreateContent from "../CreateContent";
import MessageComponent from "./Message";
import ImageUpload from "../ImageUpload";
import { FileContent } from "@/services/imageService";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Message {
  id: number;
  sender_id: number;
  message: string;
  imageLink?: string;
  videoLink?: string;
}

export interface MessageToSend extends FileContent {
  message?: string
}

export interface UserProps {
  user: User;
  messages: Message[];
  sendMessage: (message: MessageToSend) => void;
}

const ConversationContainer: React.FC<UserProps> = ({
  user,
  messages,
  sendMessage,
}) => {
  const [messageList, setMessageList] = useState<Message[]>(messages);
  const [message, setMessage] = useState<MessageToSend>({
    message: "",
    image: undefined,
    imageLink: "",
    videoLink: "",
  });

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  const handleNewMessage = (messageData: string) => {
    console.log(messageData);

    const newMessage: MessageToSend = {
      ...message,
      message: messageData,
    };
    sendMessage(newMessage);
    setMessage({ message: "", image: undefined, imageLink: "", videoLink: "" }); 
  };




  return (
    <div className="w-full flex flex-col p-8 h-full">
      <div>
        <AvatarWithName name={user.username} />
      </div>
      <div className="h-full overflow-y-scroll my-5 rounded-xl message-container py-5">
        <div className="flex-grow flex flex-col justify-end px-10">
          {messageList.map((message) => (
            <div key={message.id}>
              <MessageComponent message={message} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <ImageUpload setImage={setMessage} />
        <CreateContent createContent={handleNewMessage} placeholder="Write a message" />
      </div>
    </div>
  );
};

export default ConversationContainer;
