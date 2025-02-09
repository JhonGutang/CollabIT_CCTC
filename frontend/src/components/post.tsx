import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { deletePost, updatePost } from "@/services/postService";
import { Button } from "@mui/material";
import PostContent from "./PostContent";
import Snackbar from "./Snackbar";
import DropdownMenu from "./DropdownMenu";

type Post = {
  id: number;
  userId: number;
  content: string;
  imageLink: string;
  videoLink: string;
};

type PostProps = {
  post: Post;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const postContentRef = useRef<{ getContent: () => string }>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const handleSaveContent = () => {
    if (postContentRef.current) {
      const content = postContentRef.current.getContent();
      setEditedContent(content);
      updatePost({ ...post, content: content });
      setIsEdit(false);
    }
  };

  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost(postId);
      setSnackbar({ open: true, message: "Post deleted successfully!" });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to delete post. Please try again.",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const menuItems = [
    {
      label: "Edit Post",
      onClick: toggleEdit,
    },
    {
      label: "Delete",
      onClick: () => handleDeletePost(post.id),
    },
  ];

  return (
    <div className="relative h-auto mb-5 w-[40vw] rounded-xl p-6">
      <div className="absolute inset-0 bg-black opacity-40 rounded-xl z-0"></div>
      <div className="relative z-10">
        {/* User Profile */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src="https://i.pinimg.com/736x/11/48/01/1148010bc6df885075a558384b3dbc6b.jpg"
              className="rounded-full me-3"
              width={50}
              alt="User"
            />
            <div>
              <div className="font-semibold">User</div>
              <div className="text-xs">2 mins ago</div>
            </div>
          </div>
          <div className="relative">
            {isEdit ? (
              <div>
                <button className="me-5" onClick={handleSaveContent}>
                  <FontAwesomeIcon icon={faFloppyDisk} />
                </button>
                <button onClick={toggleEdit}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            ) : (
              <DropdownMenu
                buttonIcon={<FontAwesomeIcon icon={faEllipsis} />}
                menuItems={menuItems}
                onClose={() => {}}
              />
            )}
          </div>
        </div>

        {/* Post Content */}
        {isEdit ? (
          <PostContent
            ref={postContentRef}
            post={post}
          />
        ) : (
          <div>
            <div className="w-full flex-col items-center mb-7">
              <div className="w-full mb-4">{editedContent}</div>

              {post.imageLink && (
                <div className="w-full flex justify-center">
                  <img
                    src={post.imageLink}
                    alt="Post image"
                    className="rounded-xl post-images"
                  />
                </div>
              )}
              {post.videoLink && <video src={post.videoLink} controls />}
            </div>

            {/* Reaction Buttons */}
            <div className="flex text-sm w-full">
              <Button variant="contained" className="reaction-button">
                Fire
              </Button>
              <Button variant="contained" className="reaction-button w-[9vw]">
                Comment
              </Button>
              <Button variant="contained" className="reaction-button w-[7vw]">
                Share
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Reusable Snackbar */}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default Post;
