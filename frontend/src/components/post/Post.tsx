import React, { useState, useRef, useEffect } from "react";
import { Ellipsis, Save, UserRoundPlus, X } from "lucide-react";
import { deletePost, updatePost } from "@/services/postService";
import { addToFriends } from "@/services/userService";
import ActionButtons from "./ActionButtons";
import EditPostContent from "./EditPostContent";
import Snackbar from "../Snackbar";
import DropdownMenu from "./DropdownMenu";
import Comments from "../comments/Main";
import AvatarWithContents from "../AvatarWithContents";

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

const Post: React.FC<PostProps> = ({
  post,
  userId,
  deletedPost,
  areFriends,
}) => {
  const [isCommentClicked, setIsCommentClicked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isFriend, setIsFriend] = useState(areFriends);
  // const [showProfile, setShowProfile] = useState(false);
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
      console.error(error);
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
    <div className="relative h-auto mb-5 custom-base-container p-6">
      <div className="relative">
        {/* User Profile */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div
              className="relative"
            >
              <AvatarWithContents
                avatarLink={post.avatarLink}
                size={50}
                name={post.username}
                time="2mins ago"
              />
              {/* {showProfile && (
                <div className="absolute top-[60px] left-0 z-[9999]">
                  <UserProfiles username={post.username} avatarLink={post.avatarLink}/>
                </div>
              )} */}
            </div>
          </div>
          <div className="relative">
            {isEdit && (
              <div>
                <button className="me-5 cursor-pointer" onClick={handleSaveContent}>
                  <Save/>
                </button>
                <button onClick={toggleEdit} className="cursor-pointer">
                  <X/>
                </button>
              </div>
            )}

            {!isEdit && (userId === post.userId || userId === post.user_id) && (
              <DropdownMenu
                buttonIcon={<Ellipsis />}
                menuItems={menuItems}
                onClose={() => {}}
              />
            )}

            {(!isFriend) && (
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
          <EditPostContent ref={postContentRef} post={post} />
        ) : (
          <div>
            <div className="w-full flex-col items-center mb-7">
              <div className="w-full mb-4">{editedContent}</div>

              {post.imageLink && (
                <div className="w-full flex justify-center rounded-xl">
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
        post={post}
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
