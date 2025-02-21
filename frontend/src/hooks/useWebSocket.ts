import { useState, useEffect, useRef, useCallback } from "react";
import { getUserDataFromLocal } from "@/services/userService";

interface Message {
  message: string;
  sender_id: number;
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
    if (!url) return;

    if (socketRef.current) {
      socketRef.current.close();
    }

    const ws = new WebSocket(url);

    ws.onopen = () => console.log("WebSocket Connected");

    ws.onmessage = (event) => {
      try {
        const data: Message = JSON.parse(event.data);
        setMessages((prev) => [...prev, { ...data, id: Date.now() + Math.random() }]);
      } catch (error) {
        console.error("Invalid WebSocket message format:", error);
      }
    };

    ws.onerror = (error) => console.error("WebSocket Error:", error);

    ws.onclose = () => console.log("WebSocket Disconnected");

    socketRef.current = ws;
  }, [token]);

  const sendMessage = useCallback((message: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message }));
    }
  }, []);

  useEffect(() => {
    return () => {
      socketRef.current?.close();
    };
  }, []);

  return { messages, sendMessage, connectWebSocket };
};

export default useWebSocket;
