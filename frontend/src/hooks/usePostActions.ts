import { deletePost, updatePost } from "@/services/postService";
import { useRef, useState } from "react";
import { Post } from "@/types/post";

interface PostActionProps {
  post: Post;
  deletedPost: (postId: number) => void
}

export const usePostActions = ({ post, deletedPost }: PostActionProps) => {
  const postContentRef = useRef<{ getContent: () => string }>(null);
  const [editedContent, setEditedContent] = useState(post.content);
  const [isEdit, setIsEdit] = useState(false);
  const [isCommentClicked, setIsCommentClicked] = useState(false);
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

  return {
    isEdit,
    isCommentClicked,
    editedContent,
    handleSaveContent,
    postContentRef,
    setIsEdit,
    toggleEdit,
    toggleComment,
    handleDeletePost,
    handleCloseSnackbar
  };
};
