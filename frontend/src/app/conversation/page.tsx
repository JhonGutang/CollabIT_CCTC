"use client";

import UsersList from "@/components/conversation/UsersList";
import { useState, useEffect } from "react";
import ConversationContainer from "@/components/conversation/Conversation";
import {
  createConversation,
  getMessages,
} from "@/services/conversationsService";
import Fallback from "@/components/conversation/Fallback";
import useWebSocket from "@/hooks/useWebSocket";
import { House } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter()
  const [currentChat, setCurrentChat] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const {
    messages: wsMessages,
    sendMessage,
    connectWebSocket,
  } = useWebSocket();

  const handleCurrentUser = async (user: User) => {
    setCurrentChat(user);
    await createConversation(user.id);
    const resMessages = await getMessages();
    setMessages(resMessages);
    connectWebSocket();
  };

  const redirectToHomepage = () => {
    router.push('home')
  }

  useEffect(() => {
    if (wsMessages.length > 0) {
      setMessages((prev) => [
        ...prev,
        ...wsMessages.map((msg) => ({
          ...msg,
          id: Date.now() + Math.random(),
        })),
      ]);
    }
  }, [wsMessages]);

  return (
    <div className="flex h-[100vh]">
      <div className="w-1/3 px-5 py-10">
        <div className="flex items-center gap-2 mb-5 cursor-pointer" onClick={redirectToHomepage}>
          <House size={30} />
          <div>Home</div>
        </div>
        <UsersList currentUser={handleCurrentUser} />
      </div>

      {currentChat ? (
        <ConversationContainer
          user={currentChat}
          messages={messages}
          sendMessage={sendMessage}
        />
      ) : (
        <Fallback />
      )}
    </div>
  );
};

export default Conversation;
