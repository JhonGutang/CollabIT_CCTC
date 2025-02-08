import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from 'axios';

export interface Post {
  id: number;
  userId: number;
  content: string;
  imageLink: string;
  videoLink: string;
}

const token = localStorage.getItem('authToken');

export const fetchPosts = async (): Promise<Post[]> => {
  console.log(token);
  try {
    const response = await axiosInstance.get("posts/", {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data.map((post: any) => ({
      id: post.id,
      userId: post.user_id,
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
  const postData = {
    user_id: post.userId,
    content: post.content,
    image_link: post.imageLink,
    video_link: post.videoLink,
  };
  try {
    const response = await axiosInstance.post("posts/", postData,{
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data
  }  catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching posts:", error.response?.data.detail || error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    return [];
  }
};

export const updatePost = async(post: Post) => {
  await axiosInstance.patch(`posts/${post.id}/update/`, post, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}

export const deletePost = async (postId: number) => {
  await axiosInstance.delete(`posts/${postId}/delete/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })
}
