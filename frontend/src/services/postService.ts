import axiosInstance from "@/utils/axiosInstance";

export interface Post {
  id: number;
  userId?: number;
  content: string;
  imageLink: string;
  videoLink: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get("posts/");
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
    const response = await axiosInstance.post("posts/", postData);
    return response.data
  } catch (error) {
    console.error(error);
  }
};
