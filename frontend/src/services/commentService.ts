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

    const modifiedData = response.data.map(({ avatar_link, ...rest }: any) => ({
      ...rest, // Spread the remaining object properties
      avatarLink: `http://127.0.0.1:8000/media/${avatar_link}`,
    }));

    console.log(modifiedData);
    return modifiedData;
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
      response.data.avatarLink = `http://127.0.0.1:8000/media/${response.data.avatar_link}`
      console.log(response.data);
      return response.data;
  } catch (error) {
    console.error (error)
  }
};
