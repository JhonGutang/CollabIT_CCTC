"use client";

import BaseLayout from "@/layouts/baseLayout";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/services/postService";
import PostComponent from "@/components/Post";
import CreatePost from "@/components/CreatePost";
import { Container } from "@mui/material";
import { getUserDataFromLocal } from "@/services/userService";

interface Post {
  id: number;
  userId: number;
  username: string;
  content: string;
  imageLink: string;
  videoLink: string;
}

function HomePage({ Component, pageProps }: AppProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState<number | undefined>(0);

  const handleUpdatePosts = (newPost: Post) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      console.log(newPost);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setUserId(getUserDataFromLocal()?.id);
      setPosts(data);
    };

    getPosts();
  }, []);

  return (
    <BaseLayout>
      <Container maxWidth="xl" className="flex flex-col items-start py-5 h-full overflow-y-scroll">
        <div>
        <CreatePost updatedPosts={handleUpdatePosts} />
        </div>
        {posts.map((post) => (
            <div key={post.id}>
                <PostComponent key={post.id} post={post} userId={userId} />
            </div>
        ))}
      </Container>
    </BaseLayout>
  );
}

export default HomePage;
