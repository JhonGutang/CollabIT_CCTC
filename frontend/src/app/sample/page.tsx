"use client";

import { useState } from "react";
import useWebSocket from "@/hooks/useWebSocket";

export default function Chat() {
  const { messages, sendMessage } = useWebSocket();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">WebSocket Chat</h2>
      <div className="border p-2 h-40 overflow-y-auto mb-2">
        {messages.map((msg, index) => (
          <p key={index} className="text-sm p-1 border-b">{msg}</p>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 ml-2">
          Send
        </button>
      </div>
    </div>
  );
}
