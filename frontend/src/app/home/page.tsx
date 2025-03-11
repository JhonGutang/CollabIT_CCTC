"use client";

import BaseLayout from "@/layouts/baseLayout";
import { useEffect, useState } from "react";
import { fetchPosts } from "@/services/postService";
import PostComponent from "@/components/post/Post";
import CreatePost from "@/components/post/CreatePost";
import { getAllFriendsID, getUserDataFromLocal } from "@/services/userService";
import Snackbar from "@/components/Snackbar";
import { Post } from "@/services/postService";

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState(0);
  const [friendsIDs, setFriendsIDs] = useState<number[]>([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  const handleUpdatePosts = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleDeletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    setSnackbar({ open: true, message: "Post deleted successfully!", type: "success" });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
  
      // Ensure localStorage is accessed only on the client side
      let userId = 0;
      if (typeof window !== "undefined") {
        userId = getUserDataFromLocal()?.id || 0;
      }
  
      setUserId(userId);
      setPosts(data);
  
      const friends = await getAllFriendsID();
      setFriendsIDs(friends);
    };
  
    getPosts();
  }, []);

  return (
    <BaseLayout>
      <div>
        <CreatePost updatedPosts={handleUpdatePosts} />
      </div>
      {posts.map((post) => {    
        return (
          <div key={post.id}>
            <PostComponent
              key={post.id}
              post={post}
              userId={userId}
              areFriends={friendsIDs.includes(post.userId) || userId === post.userId}
              deletedPost={handleDeletePost}
            />
          </div>
        );
      })}

      <Snackbar
        color={snackbar.type}
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />
    </BaseLayout>
  );
}

export default HomePage;
