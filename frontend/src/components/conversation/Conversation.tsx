import React, { useState, useEffect, useRef } from "react";
import AvatarWithName from "../AvatarWithContents";
import CreateContent from "../CreateContent";
import MessageComponent from "./Message";
import ImageUpload from "../ImageUpload";
import { FileContent } from "@/services/imageService";
import ImagesWithCloseButton from "../ImagesWithCloseButton";
import CustomSnackbar from "../Snackbar";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Message {
  id: number;
  sender_id: number;
  message: string;
  imageLink?: string;
  videoLink?: string;
}

export interface MessageToSend extends FileContent {
  message?: string;
}

export interface UserProps {
  user: User;
  messages: Message[];
  sendMessage: (message: MessageToSend) => void;
}

const ConversationContainer: React.FC<UserProps> = ({
  user,
  messages,
  sendMessage,
}) => {
  const [messageList, setMessageList] = useState<Message[]>(messages);
  const [message, setMessage] = useState<MessageToSend>({
    message: "",
    image: undefined,
    imageLink: "",
    videoLink: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleRemoveImage = () => {
    setMessage((prevPost) => ({ ...prevPost, imageLink: "" }));
  };

  const removeMessageFromList = (messageId: number) => {
    setMessageList((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
    setSnackbar({
      open: true,
      message: "Message deleted successfully",
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  useEffect(() => {
    setMessageList(messages);
  }, [messages]);

  useEffect(() => {
    // Auto-scroll to the bottom when messageList updates
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageList]);

  const handleNewMessage = (messageData: string) => {
    console.log(messageData);

    const newMessage: MessageToSend = {
      ...message,
      message: messageData,
    };
    sendMessage(newMessage);
    setMessage({ message: "", image: undefined, imageLink: "", videoLink: "" });
  };

  return (
    <div className="w-full flex flex-col p-8 h-full custom-base-container">
      <div>
        <AvatarWithName name={user.username} avatarLink={user.avatarLink} />
      </div>
      <div className="h-full overflow-y-auto my-5 rounded-xl message-container p-5">
          {messageList.map((message) => (
            <div key={message.id}>
              <MessageComponent
                message={message}
                removedMessage={removeMessageFromList}
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
      </div>

      {message.imageLink && (
        <div className="w-full mb-2 p-3 rounded-xl">
          <ImagesWithCloseButton
            imageLink={message.imageLink}
            onRemove={handleRemoveImage}
          />
        </div>
      )}
      <div className="flex gap-2 items-center">
        <ImageUpload setImage={setMessage} />
        <CreateContent
          createContent={handleNewMessage}
          placeholder="Write a message"
        />
      </div>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleSnackbarClose}
        position={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
};

export default ConversationContainer;
