import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { getUserDataFromLocal } from "@/services/userService"; // Import the new function

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

export const fetchPosts = async (): Promise<Post[]> => {
  const token = getUserDataFromLocal()?.authToken;
  try {
    const response = await axiosInstance.get("posts/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.map((post: any) => ({
      id: post.id,
      userId: post.user_id,
      username: post.username,
      avatarLink:  post.avatar_link ? `http://127.0.0.1:8000/media/${post.avatar_link}` : null,
      content: post.content,
      imageLink: post.image_link,
      videoLink: post.video_link,
      reactionCount: post.reactions_count,
      commentsCount: post.comments_count,
      reactionId: post.reaction_id,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const submitPost = async (post: Partial<Post>) => {
  const { id: userId, authToken: token } = getUserDataFromLocal() || {};
  const formData = new FormData();

  formData.append("user_id", String(userId));
  formData.append("content", post.content || "");
  
  if (post.image) {
    formData.append("image_link", post.image);
  }
  
  formData.append("video_link", post.videoLink || "");

  try {
    const { data } = await axiosInstance.post("posts/", formData, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      ...data,
      imageLink: data.image_link ? `${data.image_link}` : undefined,
      avatarLink: `http://127.0.0.1:8000/media/${data.avatar_link}`,
      userId: data.user_id,
    };
  } catch (error) {
    const errorMessage = error instanceof AxiosError 
      ? error.response?.data.detail || error.message 
      : "An unexpected error occurred:";
    console.error("Error submitting post:", errorMessage);
    return [];
  }
};

export const updatePost = async (post: Post) => {
  const token = getUserDataFromLocal()?.authToken;
  const updatedPost = { ...post, image_link: undefined };

  await axiosInstance.patch(`posts/${post.id}/update/`, updatedPost, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const deletePost = async (postId: number) => {
  const token = getUserDataFromLocal()?.authToken;
  await axiosInstance.delete(`posts/${postId}/delete/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const reactingPost = async (postId: number, userId: number) => {
  const token = getUserDataFromLocal()?.authToken;
  const reaction = {
    post_id: postId,
    user_id: userId,
  };
  try {
    const response = await axiosInstance.post("posts/react/", reaction, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.id;
  } catch (error) {
    console.error("Error reacting post:", error);
  }
};

export const removingReactionOnPost = async (reactionId: number) => {
  const token = getUserDataFromLocal()?.authToken;
  await axiosInstance.delete(`posts/react/${reactionId}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  })
}
