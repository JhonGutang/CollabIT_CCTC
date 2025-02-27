import axiosInstance from "@/utils/axiosInstance";
import { getUserDataFromLocal } from "./userService";
import { FileContent } from "./imageService";

interface MessageToSend extends FileContent {
  message: string;
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
};


const formatMessageResponse = (message: any) => ({
  ...message,
  imageLink: message.image_link, 
});

export const getMessages = async (conversationId: number) => {
  console.log("getMessages called");

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
    
    message.image && formData.append("image_link", message.image);
    message.videoLink && formData.append("video", message.videoLink);

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
