import { IconButton } from "@mui/material";
import { useState } from "react";
import { SendHorizontal } from "lucide-react";

export interface MessageProps {
    createContent: (message: string) => void;
    placeholder: string;
}

const CreateContent = ({ createContent, placeholder }: MessageProps) => {
    const [content, setContent] = useState("");

    const sendCreatedContent = async () => {
        if (content.trim() === "") return; // Prevent sending empty messages
        createContent(content);
        setContent("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            sendCreatedContent();
        }
    };

    return (
        <div className="flex gap-5 w-full items-start justify-center">
            <div className="relative w-full">
                <input
                    type="text"
                    className="w-full pl-4 pr-12 py-2 border custom-border-radius focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={content}
                    placeholder={placeholder}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown} // Added event listener for Enter key
                />

                <IconButton
                    onClick={sendCreatedContent}
                    className="!absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                    <SendHorizontal size={20} />
                </IconButton>
            </div>
        </div>
    );
};

export default CreateContent;
