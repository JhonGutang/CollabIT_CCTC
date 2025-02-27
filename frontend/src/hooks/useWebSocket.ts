import { useState, useEffect, useRef, useCallback } from "react";
import { getUserDataFromLocal } from "@/services/userService";

interface Message {
  id: number;
  message: string;
  sender_id: number;
  image?: string;
  videoLink?: string;
  imageLink?: string,
  image_link?: string
}

interface MessageToSend {
  message?: string;
  image?: File;
  imageLink?:string;
  videoLink?: string;
}

const useWebSocket = () => {
  const token = getUserDataFromLocal()?.authToken;
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  const getWebSocketUrl = () => {
    const conversationId = localStorage.getItem("conversationId");
    if (!conversationId) return null;

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    return `${protocol}://localhost:8000/ws/chat/${conversationId}/?token=${token}`;
  };

  const connectWebSocket = useCallback(() => {
    const url = getWebSocketUrl();
    if (!url || socketRef.current) return;

    const ws = new WebSocket(url);

    ws.onopen = () => console.log("WebSocket Connected");

    ws.onmessage = (event) => {
      try {
        const data: Message = JSON.parse(event.data);

        const formattedMessage: Message = {
          id: data.id,
          message: data.message,
          sender_id: data.sender_id,
          image: data.image, // Assuming `data.image` is correct
          imageLink: data.image_link, // Renaming `image_link` to `imageLink`
          videoLink: data.videoLink,
        };

        setMessages((prev) =>
          prev.some((msg) => msg.id === data.id) ? prev : [...prev, data]
        );
      } catch (error) {
        console.error("Invalid WebSocket message format:", error);
      }
    };
    
    
    

    ws.onerror = (error) => console.error("WebSocket Error:", error);

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
      socketRef.current = null;
    };

    socketRef.current = ws;
  }, [token]);

  const sendMessage = useCallback(async (messageObj: MessageToSend) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket is not open. Message not sent.");
      return;
    }
  
    let imageBase64: string | undefined = undefined;
  
    if (messageObj.image) {
      const file = messageObj.image;
      const reader = new FileReader();
  
      imageBase64 = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }
  
    const payload = {
      message: messageObj.message || "",
      image: imageBase64 || undefined, 
      videoLink: messageObj.videoLink || undefined,
    };
  
    socketRef.current.send(JSON.stringify(payload));
  }, []);
  
  
  

  useEffect(() => {
    return () => {
      socketRef.current?.close();
    };
  }, []);

  return { messages, sendMessage, connectWebSocket };
};

export default useWebSocket;
