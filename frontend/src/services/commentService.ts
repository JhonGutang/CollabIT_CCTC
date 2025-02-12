import axiosInstance from "@/utils/axiosInstance";
import { getUserDataFromLocal } from "./userService";

export const fetchCommentsByPostId = async (postId: number) => {
  const token = getUserDataFromLocal()?.authToken;
  try {
    const response = await axiosInstance.get(`posts/comments/${postId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error; 
  }
};

export const createComment = async (comment: string, postId: number) => {
  const token = getUserDataFromLocal()?.authToken;

  try {
      const response = await axiosInstance.post(
        "posts/comments/create/",
        {
          content: comment,
          post_id: postId,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data;
  } catch (error) {
    console.error (error)
  }
};
