"use client";

import UsersList from "@/components/conversation/UsersList";
import { useState, useEffect } from "react";
import ConversationContainer, { MessageToSend } from "@/components/conversation/Conversation";
import {
  createConversation,
  getMessages,
  storeMessage
} from "@/services/conversationsService";
import Fallback from "@/components/conversation/Fallback";
import useWebSocket from "@/hooks/useWebSocket";
import { House } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserDataFromLocal } from "@/services/userService";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatUserId = searchParams.get("chatUserId");

  const [conversationId, setConversationId] = useState<number | null>(null);
  const [currentChat, setCurrentChat] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { messages: wsMessages, sendMessage, connectWebSocket } = useWebSocket();

  const handleCurrentUser = async (user: User) => {
    setCurrentChat(user);
    
    try {
      const getConversationId = await createConversation(user.id);
      const resMessages = await getMessages(getConversationId);
      setMessages(resMessages);
      setConversationId(getConversationId);

      localStorage.setItem("conversationId", getConversationId.toString());

      connectWebSocket();

      router.push(`/conversation?chatUserId=${user.id}`, { scroll: false });
    } catch (error) {
      console.error("Error setting up conversation:", error);
    }
  };

  const handleUsersFetched = (users: User[]) => {
    console.log("Users received in Conversation:", users);

    if (users.length === 0) return;

    const defaultUser = chatUserId
      ? users.find((user) => user.id === Number(chatUserId)) || users[0]
      : users[0];

    if (!currentChat || currentChat.id !== defaultUser.id) {
      handleCurrentUser(defaultUser);
    }
  };

  const handleMessageSend = async (message: MessageToSend) => {
    if (!conversationId) return;
  
    const currentUser = getUserDataFromLocal();
    if (!currentUser || !currentUser.id) {
      console.error("Error: Current user ID is undefined.");
      return;
    }
  
    const newMessage: Message = {
      id: Date.now() + Math.random(),
      sender_id: currentUser.id,
      message: message.message || "",
    };
    try {
      sendMessage(message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  
  

  const redirectToHomepage = () => {
    router.push("/home");
  };

  useEffect(() => {
    setMessages((prev) => {
      const existingIds = new Set(prev.map((msg) => msg.id));

      const newMessages = wsMessages
        .filter((msg) => !existingIds.has(msg.id))
        .map((msg) => ({
          ...msg,
          imageLink: `http://127.0.0.1:8000/media/${msg.image_link}`, 
        }));
  
      console.log(newMessages);
      return [...prev, ...newMessages];
    });
  }, [wsMessages]);
  

  return (
    <div className="flex h-[100vh]">
      <div className="w-1/3 px-5 py-10">
        <div className="flex items-center gap-2 mb-5 cursor-pointer" onClick={redirectToHomepage}>
          <House size={30} />
          <div>Home</div>
        </div>
        <UsersList
          currentUser={handleCurrentUser}
          location="conversation"
          onUsersFetched={handleUsersFetched}
        />
      </div>

      {currentChat ? (
        <ConversationContainer user={currentChat} messages={messages} sendMessage={handleMessageSend} />
      ) : (
        <Fallback />
      )}
    </div>
  );
};

export default Conversation;
