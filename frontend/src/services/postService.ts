import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from 'axios';
import { getUserDataFromLocal } from "@/services/userService"; // Import the new function

export interface Post {
  id: number;
  userId: number;
  username: string;
  content: string;
  image?: File;
  imageLink: string;
  videoLink: string;
}


export const fetchPosts = async (): Promise<Post[]> => {
  const token = getUserDataFromLocal()?.authToken;
  try {
    const response = await axiosInstance.get("posts/", {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data.map((post: any) => ({
      id: post.id,
      userId: post.user_id,
      username: post.username,
      content: post.content,
      imageLink: post.image_link,
      videoLink: post.video_link,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const submitPost = async (post: Partial<Post>) => {
  const userId = getUserDataFromLocal()?.id;
  const token = getUserDataFromLocal()?.authToken;
  const formData = new FormData();
  formData.append('user_id', String(userId));
  formData.append('content', post.content || '');
  if (post.image) {
    formData.append('image_link', post.image);
  } 
  formData.append('video_link', post.videoLink || '');

  try {
    const response = await axiosInstance.post("posts/", formData, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    });
    if (response.data && response.data.image_link) {
      response.data.imageLink = `http://127.0.0.1:8000${response.data.image_link}`;
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching posts:", error.response?.data.detail || error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    return [];
  }
};

export const updatePost = async (post: Post) => {
  const token = getUserDataFromLocal()?.authToken;
  const updatedPost = { ...post, image_link: undefined };

  await axiosInstance.patch(`posts/${post.id}/update/`, updatedPost, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
}

export const deletePost = async (postId: number) => {
  const token = getUserDataFromLocal()?.authToken;
  await axiosInstance.delete(`posts/${postId}/delete/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
