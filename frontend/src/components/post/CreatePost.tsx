import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Video } from "lucide-react";
import CustomSnackbar from "../Snackbar";
import ImagesWithCloseButton from "../ImagesWithCloseButton";
import ImageUpload from "../ImageUpload";
import { Post, PostToSend } from "@/types/post";
import { usePostActions } from "@/hooks/usePostActions";

interface ChildProps {
  updatedPosts: (data: Post) => void;
};

const CreatePost: React.FC<ChildProps> = ({ updatedPosts }) => {
  const hasValue = (value?: string) => value?.trim() !== "";
  const [newPost, setPost] = useState<PostToSend>({
    content: "",
    image: undefined,
    imageLink: "",
    videoLink: "",
  });

  const { handleSubmission, handlePost, snackbar, handleCloseSnackbar } = usePostActions({newPost, setPost, updatedPosts});

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
          value={newPost.content}
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
      {hasValue(newPost.imageLink) && (
        <ImagesWithCloseButton imageLink={newPost.imageLink ?? ""} onRemove={handleRemoveImage} />
      )}

      <CustomSnackbar open={snackbar.open} message={snackbar.message} onClose={handleCloseSnackbar} color={snackbar.type} />
    </div>
  );
};

export default CreatePost;
