import axiosInstance from "@/utils/axiosInstance";
import { getUserDataFromLocal } from "./userService";

export const getMessages = async () => { 
  console.log("getMessages called");
  const token = getUserDataFromLocal()?.authToken;
  const conversationId = localStorage.getItem("conversationId");
  try {
    const response = await axiosInstance.get(`conversations/${conversationId}/messages`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting messages:", error);
  }
};

export const createConversation = async (recipientId: number) => {
  const token = getUserDataFromLocal()?.authToken;
  try {
    const response = await axiosInstance.post(
      "conversations/create/",
      {recipient_id: recipientId},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    const id = response.data.conversation.id;
    localStorage.setItem("conversationId", id);
  } catch (error) {
    console.error("Error creating conversation:", error);
  }
};

export const storeMessage = async (message: string) => {
  const token = getUserDataFromLocal()?.authToken;
  const conversationId = localStorage.getItem("conversationId");
  try {
    const response = await axiosInstance.post(
      "conversations/send-message/",
      {
        conversation_id: conversationId,
        message: message,
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error storing message:", error);
  }
};

