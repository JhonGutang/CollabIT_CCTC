"use client";

import BaseLayout from "@/layouts/baseLayout";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/services/postService";
import PostComponent from "@/components/Post";
import CreatePost from "@/components/CreatePost";
import { getUserDataFromLocal } from "@/services/userService";
import Snackbar from "@/components/Snackbar";

interface Post {
  id: number;
  userId: number;
  username: string;
  content: string;
  imageLink: string;
  videoLink: string;
  reactionCount: number;
  reactionId: number;
}

function HomePage({ Component, pageProps }: AppProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const handleUpdatePosts = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleDeletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    setSnackbar({ open: true, message: "Post deleted successfully!" });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      const userId = getUserDataFromLocal()?.id || 0;
      setUserId(userId);
      setPosts(data);
    };

    getPosts();
  }, []);

  return (
    <BaseLayout>
      <div>
        <div>
          <CreatePost updatedPosts={handleUpdatePosts} />
        </div>
        {posts.map((post) => (
          <div key={post.id}>
            <PostComponent
              key={post.id}
              post={post}
              userId={userId}
              deletedPost={handleDeletePost}
            />
          </div>
        ))}
        <Snackbar
          open={snackbar.open}
          message={snackbar.message}
          onClose={handleCloseSnackbar}
        />
      </div>
    </BaseLayout>
  );
}

export default HomePage;
