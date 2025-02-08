import React, { useState } from "react";
import { submitPost } from "@/services/postService";
import { Button } from "@mui/material";
import CustomSnackbar from "./Snackbar";

type Post = {
  id: number;
  userId: number;
  content: string;
  imageLink: string;
  videoLink: string;
};

type ChildProps = {
  updatedPosts: (data: Post) => void;
};

const CreatePost: React.FC<ChildProps> = ({ updatedPosts }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const [post, setPost] = useState({
    userId: 12,
    content: "",
    imageLink: "",
    videoLink: "",
  });

  const handlePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPost = await submitPost(post);
      setSnackbar({ open: true, message: "Post submitted successfully!" });
      updatedPosts(newPost);
      setPost({ userId: 12, content: "", imageLink: "", videoLink: "" });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to submit post. Please try again." });
    }
  };

  return (
    <div className="relative w-[40vw] mb-10 p-5 rounded-xl">
      {/* Background opacity layer */}
      <div className="absolute inset-0 bg-black opacity-20 rounded-xl z-0"></div>

      {/* Form content */}
      <form onSubmit={handleSubmission} className="relative z-10">
        <input
          type="text"
          name="content"
          id="content"
          value={post.content}
          onChange={handlePost}
          autoComplete="false"
          className="w-full bg-transparent border border-white-500 h-[8vh] p-3 mb-4 rounded-xl z-10"
          placeholder="What's on your Mind?"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#02353C" }}
            className="w-[7vw] h-[4vh] rounded-xl z-10"
          >
            Post
          </Button>
        </div>
      </form>

      <CustomSnackbar open={snackbar.open} message={snackbar.message} onClose={handleCloseSnackbar} />
    </div>
  );
};

export default CreatePost;
