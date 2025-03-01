import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { getUserDataFromLocal } from "./userService";

const getAuthToken = (): string | null => getUserDataFromLocal()?.authToken || null;

const getAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token is missing.");
  return { Authorization: `Token ${token}` };
};

const API_ENDPOINTS = {
  FETCH_COMMENTS: (postId: number) => `posts/comments/${postId}/`,
  CREATE_COMMENT: "posts/comments/create/",
  DELETE_COMMENT: (commentId: number) => `posts/comments/${commentId}/delete/`
};

const formatCommentResponse = (comment: any) => ({
  ...comment,
  avatarLink: comment.avatar_link ? `http://127.0.0.1:8000/media/${comment.avatar_link}` : "",
});

export const fetchCommentsByPostId = async (postId: number) => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.FETCH_COMMENTS(postId), {
      headers: getAuthHeaders(),
    });

    return response.data.map(formatCommentResponse);
  } catch (error) {
    handleAxiosError(error, "Error fetching comments");
    return [];
  }
};

export const createComment = async (comment: string, postId: number) => {
  try {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CREATE_COMMENT,
      { content: comment, post_id: postId },
      { headers: getAuthHeaders() }
    );

    return formatCommentResponse(response.data);
  } catch (error) {
    handleAxiosError(error, "Error creating comment");
    return null;
  }
};

export const updateComment = async (comment: { id: number; content: string }) => {
  try {
    const response = await axiosInstance.put(
      `posts/comments/${comment.id}/update/`,
      { content: comment.content },
      { headers: getAuthHeaders() }
    );
    response.data.avatarLink = `http://127.0.0.1:8000/media/${response.data.avatar_link}`
    return response
  } catch (error) {
    handleAxiosError(error, "Error updating comment");
  }
}

export const deleteComment = async (commentId: number) => {
  const response = await axiosInstance.delete(API_ENDPOINTS.DELETE_COMMENT(commentId), {
    headers: getAuthHeaders()
  })
  console.log(response);
}

const handleAxiosError = (error: unknown, message: string) => {
  const errorMessage =
    error instanceof AxiosError ? error.response?.data.detail || error.message : "An unexpected error occurred.";
  console.error(message, errorMessage);
};
