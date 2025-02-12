import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import { storeMessage } from "@/services/conversationsService";
import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <div className="flex gap-5 w-full items-start justify-center">
            <IconButton>
                <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
            </IconButton>
            <input 
                type="text" 
                className="message-input w-2/3" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
            />
            <IconButton onClick={sendMessage}>
                <FontAwesomeIcon icon={faPaperPlane}/>
            </IconButton>
        </div>
    );
}
 
export default CreateMessage;