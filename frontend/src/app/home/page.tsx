"use client";

import BaseLayout from "@/layouts/baseLayout";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/services/postService";
import PostComponent from "@/components/Post";
import CreatePost from "@/components/CreatePost";
import { Container } from "@mui/material";

interface Post {
  id: number;
  userId: number;
  content: string;
  imageLink: string;
  videoLink: string;
}

function HomePage({ Component, pageProps }: AppProps) {
  const [posts, setPosts] = useState<Post[]>([]);


  const handleUpdatePosts = (newPost: Post) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };

    getPosts();
  }, []);

  return (
    <BaseLayout>
      <Container maxWidth="xl" className="flex flex-col items-center py-5">
        <div>
        <CreatePost updatedPosts={handleUpdatePosts} />
        </div>
        {posts.map((post) => (
            <div key={post.id}>
                <PostComponent key={post.id} post={post} />
            </div>
        ))}
      </Container>
    </BaseLayout>
  );
}

export default HomePage;
