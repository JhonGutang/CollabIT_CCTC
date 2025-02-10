import React, { useEffect, useRef, useState } from "react";
import { submitPost } from "@/services/postService";
import { Button, Container, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo, faClose } from "@fortawesome/free-solid-svg-icons";
import CustomSnackbar from "./Snackbar";
import {
  handleFileChange,
  handleImageClick,
  setFileInputRef,
} from "@/services/imageService";
import ImagesWithCloseButton from "./ImagesWithCloseButton";

type Post = {
  id: number;
  userId?: number;
  username?: string;
  content: string;
  image?: File;
  imageLink: string;
  videoLink: string;
};

type ChildProps = {
  updatedPosts: (data: Post) => void;
};

const CreatePost: React.FC<ChildProps> = ({ updatedPosts }) => {
  const hasValue = (value?: string) => value?.trim() !== "";
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const [post, setPost] = useState<{
    content: string;
    image?: File;
    imageLink: string;
    videoLink: string;
  }>({
    content: "",
    image: undefined,
    imageLink: "",
    videoLink: "",
  });
  

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFileInputRef(fileInputRef.current);
  }, []);

  const handlePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPost = await submitPost(post);
      console.log(newPost);
      setSnackbar({ open: true, message: "Post submitted successfully!" });
      updatedPosts(newPost);
      setPost({ content: "", image: undefined, imageLink: "", videoLink: "" });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to submit post. Please try again.",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleRemoveImage = () => {
    setPost({ ...post, imageLink: "" });
  };

  return (
    <div className="relative w-[40vw] mb-10 p-5 rounded-xl">
      {/* Background opacity layer */}
      <div className="absolute inset-0 bg-black opacity-20 rounded-xl z-0"></div>

      {/* Form content */}
      <form onSubmit={handleSubmission} className="relative z-10">
        <textarea
          name="content"
          id="content"
          value={post.content}
          onChange={handlePost}
          autoComplete="false"
          className="w-full bg-transparent border border-white-500 h-[8vh] p-3 mb-4 rounded-xl z-10"
          placeholder="What's on your Mind?"
        />
        <div className="flex justify-between">
          <div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e, setPost)}
              style={{ display: "none" }}
            />
            <IconButton onClick={handleImageClick}>
              <FontAwesomeIcon icon={faImage} />
            </IconButton>
            <IconButton>
              <FontAwesomeIcon icon={faVideo} />
            </IconButton>
          </div>
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
      {hasValue(post.imageLink) && (
        <ImagesWithCloseButton
          imageLink={post.imageLink}
          onRemove={handleRemoveImage}
        />
      )}

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default CreatePost;
