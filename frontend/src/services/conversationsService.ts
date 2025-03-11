import axiosInstance from "@/utils/axiosInstance";
import { getUserDataFromLocal } from "./userService";
import { FileContent } from "./imageService";

interface MessageToSend extends FileContent {
  message: string;
}

interface Message {
  id: number;
  sender_id: number;
  conversation_id: number;
  message: string;
  image_link: string;
  video_link: string;
  created_at: string;
  updated_at: string;
  avatar_link: string;
}

const getAuthToken = (): string | null => getUserDataFromLocal()?.authToken || null;
const getUserId = (): number | null => getUserDataFromLocal()?.id || null;


const getAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token is missing.");
  return { Authorization: `Token ${token}` };
};


const API_ENDPOINTS = {
  GET_MESSAGES: (id: number) => `conversations/${id}/messages`,
  CREATE_CONVERSATION: "conversations/create/",
  SEND_MESSAGE: "conversations/send-message/",
  DELETE_MESSAGE: (messageId: number) => `conversations/messages/${messageId}/delete/`
};


const formatMessageResponse = (message: Message) => ({
  ...message,
  imageLink: message.image_link, 
  avatarLink: `http://127.0.0.1:8000${message.avatar_link}`
});

export const getMessages = async (conversationId: number) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.GET_MESSAGES(conversationId), {
      headers: getAuthHeaders(),
    });
    return response.data.map(formatMessageResponse);
  } catch (error) {
    console.error("Error getting messages:", error);
    throw new Error("Failed to retrieve messages.");
  }
};

export const createConversation = async (recipientId: number) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_CONVERSATION,
      { recipient_id: recipientId },
      { headers: getAuthHeaders() } 
    );
    return response.data.conversation.id;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw new Error("Failed to create conversation.");
  }
};

export const storeMessage = async (conversationId: number, message: MessageToSend) => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User ID is missing.");

    const formData = new FormData();
    formData.append("sender_id", userId.toString());
    formData.append("conversation_id", conversationId.toString());
    formData.append("message", message.message);
    
    if (message.image) {
      formData.append("image_link", message.image);
    }
    
    if (message.videoLink) {
      formData.append("video", message.videoLink);
    }

    const response = await axiosInstance.post(API_ENDPOINTS.SEND_MESSAGE, formData, {
      headers: {
        ...getAuthHeaders(), 
        "Content-Type": "multipart/form-data",
      },
    });

    return formatMessageResponse(response.data);
  } catch (error) {
    console.error("Error storing message:", error);
    throw new Error("Failed to send message.");
  }
};



export const deleteMessage = async (messageId: number) => {
  await axiosInstance.delete(API_ENDPOINTS.DELETE_MESSAGE(messageId), {
    headers: getAuthHeaders()
  })
  console.log('Message Deleted Succesfully')
}