import { IconButton } from "@mui/material";
import { useState } from "react";
import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface MessageProps {
    location: string,
    createContent: (message: string) => void;
}

const CreateContent = ({ location, createContent }: MessageProps) => {
    const [content, setContent] = useState("");

    const sendCreatedContent = async() => {
        createContent(content);
        setContent("");
    }

    return ( 
        <div className="flex gap-5 w-full items-start justify-center">
            { location === 'conversation' && 
            <IconButton>
                <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
            </IconButton>

            }
            <input 
                type="text" 
                className="message-input w-2/3" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
            />
            <IconButton onClick={sendCreatedContent}>
                <FontAwesomeIcon icon={faPaperPlane}/>
            </IconButton>
        </div>
    );
}
 
export default CreateContent;