"use client";

import UsersList from "@/components/conversation/UsersList";
import { useState } from "react";
import ConversationContainer from "@/components/conversation/Conversation";
import { createConversation, getMessages } from "@/services/conversationsService";
import Fallback from "@/components/conversation/Fallback";
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

const Conversation = () => {
  const [currentChat, setCurrentChat] = useState<User>();
  const [messages, setMessages] = useState<Message[]>([]);
  const handleCurrentUser = async (user: User) => {
    setCurrentChat(user);
    await createConversation(user.id);
    const resMessages = await getMessages();
    setMessages(resMessages);
  };

  return (
    <div className="flex h-[100vh]">
      <div className=" w-1/3 px-5 py-10">
        <UsersList currentUser={handleCurrentUser} />
      </div>

      {currentChat ? (
        <ConversationContainer user={currentChat} messages={messages}/>
      ) : (
       <Fallback/>
      )}
    </div>
  );
};

export default Conversation;
