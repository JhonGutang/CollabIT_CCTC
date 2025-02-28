import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { getUserDataFromLocal } from "@/services/userService";

export interface Post {
  id: number;
  userId: number;
  username: string;
  avatarLink: string;
  content: string;
  image?: File;
  imageLink: string;
  videoLink: string;
  reactionCount: number;
  commentsCount: number;
  reactionId: number;
}

const getAuthToken = (): string | null => getUserDataFromLocal()?.authToken || null;
const getUserId = (): number | null => getUserDataFromLocal()?.id || null;

const getAuthHeaders = () => {
  const token = getAuthToken();
  if (!token) throw new Error("Authentication token is missing.");
  return { Authorization: `Token ${token}` };
};

const API_ENDPOINTS = {
  FETCH_POSTS: "posts/",
  SUBMIT_POST: "posts/",
  UPDATE_POST: (postId: number) => `posts/${postId}/update/`,
  DELETE_POST: (postId: number) => `posts/${postId}/delete/`,
  ADD_REACTION: "posts/react/",
  REMOVE_REACTION: (reactionId: number) => `posts/react/${reactionId}`,
};

const formatPostResponse = (post: any): Post => ({
  id: post.id,
  userId: post.user_id,
  username: post.username,
  avatarLink: post.avatar_link ? `http://127.0.0.1:8000/media/${post.avatar_link}` : "",
  content: post.content,
  imageLink: post.image_link || "",
  videoLink: post.video_link || "",
  reactionCount: post.reactions_count,
  commentsCount: post.comments_count,
  reactionId: post.reaction_id,
});

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.FETCH_POSTS, {
      headers: getAuthHeaders(),
    });

    return response.data.map(formatPostResponse);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const submitPost = async (post: Partial<Post>) => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User ID is missing.");

    const formData = new FormData();
    formData.append("user_id", String(userId));
    formData.append("content", post.content || "");
    
    if (post.image) formData.append("image_link", post.image);
    if (post.videoLink) formData.append("video_link", post.videoLink);

    const { data } = await axiosInstance.post(API_ENDPOINTS.SUBMIT_POST, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });

    return formatPostResponse(data);
  } catch (error) {
    handleAxiosError(error, "Error submitting post");
    return null;
  }
};

export const updatePost = async (post: Post) => {
  try {
    await axiosInstance.patch(API_ENDPOINTS.UPDATE_POST(post.id), post, {
      headers: getAuthHeaders(),
    });
    console.log("Post updated successfully.");
  } catch (error) {
    handleAxiosError(error, "Error updating post");
  }
};

export const deletePost = async (postId: number) => {
  try {
    await axiosInstance.delete(API_ENDPOINTS.DELETE_POST(postId), {
      headers: getAuthHeaders(),
    });
    console.log("Post deleted successfully.");
  } catch (error) {
    handleAxiosError(error, "Error deleting post");
  }
};

export const addReactionToPost = async (postId: number) => {
  try {
    const userId = getUserId();
    if (!userId) throw new Error("User ID is missing.");

    const response = await axiosInstance.post(API_ENDPOINTS.ADD_REACTION, {
      post_id: postId,
      user_id: userId,
    }, { headers: getAuthHeaders() });

    return response.data.id;
  } catch (error) {
    handleAxiosError(error, "Error reacting to post");
    return null;
  }
};

export const removeReactionFromPost = async (reactionId: number) => {
  try {
    await axiosInstance.delete(API_ENDPOINTS.REMOVE_REACTION(reactionId), {
      headers: getAuthHeaders(),
    });
    console.log("Reaction removed successfully.");
  } catch (error) {
    handleAxiosError(error, "Error removing reaction");
  }
};

const handleAxiosError = (error: unknown, message: string) => {
  const errorMessage =
    error instanceof AxiosError ? error.response?.data.detail || error.message : "An unexpected error occurred.";
  console.error(message, errorMessage);
};
