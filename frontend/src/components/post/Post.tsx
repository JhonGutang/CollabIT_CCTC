import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserRoundPlus } from "lucide-react";
import {
  faEllipsis,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { deletePost, updatePost } from "@/services/postService";
import { addToFriends } from "@/services/userService";
import ActionButtons from "./ActionButtons";
import PostContent from "./PostContent";
import Snackbar from "../Snackbar";
import DropdownMenu from "./DropdownMenu";
import Comments from "./Comments";
import { Avatar } from "@mui/material";

type Post = {
  id: number;
  userId: number;
  username: string;
  avatarLink: string;
  content: string;
  imageLink: string;
  videoLink: string;
  user_id?: number;
  reactionCount: number;
  commentsCount: number;
  reactionId: number;
};

interface PostProps {
  post: Post;
  userId: number;
  areFriends: boolean;
  deletedPost: (postId: number) => void;
}

const Post: React.FC<PostProps> = ({ post, userId, deletedPost, areFriends }) => {
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isFriend, setIsFriend] = useState(areFriends);
  const [editedContent, setEditedContent] = useState(post.content);
  const postContentRef = useRef<{ getContent: () => string }>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    setIsFriend(areFriends);
  }, [areFriends]);

  const handleAddFriends = async (friendId: number) => {
    try {
      await addToFriends(friendId);
      setIsFriend(true);
      setSnackbar({
        open: true,
        message: `You are now Friends with ${post.username}!`,
      });
    } catch (error) {
      console.error(error)
      setSnackbar({
        open: true,
        message: "Failed to add friend. Please try again.",
      });
    }
  };

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

  const toggleComment = () => {
    setIsCommentClicked((prev) => !prev);
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost(postId);
      deletedPost(post.id);
    } catch (error) {
      console.error("Error deleting post:", error);
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
    <div className="relative h-auto mb-5 custom-border-radius p-6 post border-2">
      <div className="relative z-10">
        {/* User Profile */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Avatar
              src={post.avatarLink}
              sx={{ width: "50px", height: "50px" }}
              className="me-3"
            />
            <div>
              <div className="font-semibold">{post.username}</div>
              <div className="text-xs">2 mins ago</div>
            </div>
          </div>
          <div className="relative">
            {isEdit && (
              <div>
                <button className="me-5" onClick={handleSaveContent}>
                  <FontAwesomeIcon icon={faFloppyDisk} />
                </button>
                <button onClick={toggleEdit}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            )}

            {!isEdit && (userId === post.userId || userId === post.user_id) && (
              <DropdownMenu
                buttonIcon={<FontAwesomeIcon icon={faEllipsis} />}
                menuItems={menuItems}
                onClose={() => {}}
              />
            )}

            {!isFriend && (
              <div
                className="cursor-pointer me-3"
                onClick={() => handleAddFriends(post.userId)}
              >
                <UserRoundPlus color="green" />
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        {isEdit ? (
          <PostContent ref={postContentRef} post={post} />
        ) : (
          <div>
            <div className="w-full flex-col items-center mb-7">
              <div className="w-full mb-4">{editedContent}</div>

              {post.imageLink && (
                <div className="w-full flex justify-center border-2 rounded-xl">
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
            <ActionButtons
              userId={userId}
              postId={post.id}
              reactionCount={post.reactionCount}
              commentsCount={post.commentsCount}
              reactionId={post.reactionId}
              toggleComment={toggleComment}
            />
          </div>
        )}
      </div>

      <Comments
        isCommentClicked={isCommentClicked}
        toggleComment={toggleComment}
        postId={post.id}
      />

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default Post;
