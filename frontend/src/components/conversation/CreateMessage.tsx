import { Button } from "@mui/material";
import { useState } from "react";
import { storeMessage } from "@/services/conversationsService";

export interface Message {
    id: number;
    sender_id: number;
    message: string;
  }

export interface MessageProps {
    updateMessages: (message: Message) => void;
}

const CreateMessage = ({ updateMessages }: MessageProps) => {
    const [message, setMessage] = useState("");

    const sendMessage = async() => {
        const newMessage = await storeMessage(message);
        updateMessages(newMessage);
        setMessage("");
    }

    return ( 
        <div className="flex w-full items-center justify-center">
            <input 
                type="text" 
                className="message-input me-3 w-2/3" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
            />
            <Button variant="contained" onClick={sendMessage}>Send</Button>
        </div>
    );
}
 
export default CreateMessage;