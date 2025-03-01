import React, { useState } from "react";
import { submitPost } from "@/services/postService";
import { Button, IconButton } from "@mui/material";
import { Video } from "lucide-react";
import CustomSnackbar from "../Snackbar";
import ImagesWithCloseButton from "../ImagesWithCloseButton";
import ImageUpload from "../ImageUpload";
import { FileContent } from "@/services/imageService";

type Post = {
  id: number;
  userId?: number;
  username?: string;
  content: string;
  image?: File;
  imageLink: string;
  videoLink: string;
  reactionCount?: number;
  reactionId?: number;
};

export interface PostToSend extends FileContent {
  content?: string;
}


type ChildProps = {
  updatedPosts: (data: Post) => void;
};

const CreatePost: React.FC<ChildProps> = ({ updatedPosts }) => {
  const hasValue = (value?: string) => value?.trim() !== "";
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const [post, setPost] = useState<PostToSend>({
    content: "",
    image: undefined,
    imageLink: "",
    videoLink: "",
  });

  const handlePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPost = await submitPost(post);
      console.log(newPost);
      setSnackbar({ open: true, message: "Post submitted successfully!" });
      if(newPost) updatedPosts(newPost);
      setPost({ content: "", image: undefined, imageLink: "", videoLink: "" });
    } catch (error) {
      console.error(error)
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
    setPost((prevPost) => ({ ...prevPost, imageLink: "" }));
  };
  

  return (
    <div className="relative w-full custom-base-container mb-8 p-5 rounded-xl">

      {/* Form content */}
      <form onSubmit={handleSubmission}>
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
          <div className="flex">
            <ImageUpload setImage={setPost} />
            <IconButton>
              <Video color="black"/>
            </IconButton>
          </div>
          <Button
            type="submit"
            variant="contained"
            className="w-[7vw] h-[4vh] primary-buttons rounded-xl z-10"
          >
            Post
          </Button>
        </div>
      </form>
      {hasValue(post.imageLink) && (
        <ImagesWithCloseButton imageLink={post.imageLink ?? ""} onRemove={handleRemoveImage} />
      )}

      <CustomSnackbar open={snackbar.open} message={snackbar.message} onClose={handleCloseSnackbar} />
    </div>
  );
};

export default CreatePost;
