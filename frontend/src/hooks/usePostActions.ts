import { deletePost, submitPost, updatePost } from "@/services/postService";
import { useRef, useState } from "react";
import { Post, PostToSend } from "@/types/post";
import { useSnackbar } from "./useSnackbar";

export interface PostActionProps {
  post?: Post;
  deletedPost?: (postId: number) => void;
  updatedPosts?: (data: Post) => void;
  newPost?: PostToSend;
  setPost?: React.Dispatch<React.SetStateAction<PostToSend>>;
}

export const usePostActions = ({
  post,
  newPost,
  setPost,
  deletedPost,
  updatedPosts,
}: PostActionProps = {}) => {
  const {snackbar, showSnackbar, handleCloseSnackbar} = useSnackbar()
  const postContentRef = useRef<{ getContent: () => string }>(null);
  const [editedContent, setEditedContent] = useState(post?.content);
  const [isEdit, setIsEdit] = useState(false);
  const [isCommentClicked, setIsCommentClicked] = useState(false);

  const handlePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost?.({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newPost || !setPost) return;

    try {
      const response = await submitPost(newPost);
      showSnackbar("Posted Successfully", "success");
      if (response) updatedPosts?.(response);
      resetForm();
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to submit post. Please try again.", "error");
    }
  };

  const handleSaveContent = () => {
    if (!postContentRef.current || !post) return;

    const content = postContentRef.current.getContent();
    setEditedContent(content);
    updatePost({ ...post, content: content });
    setIsEdit(false);
    showSnackbar("Post Updated", "success");
  };



  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost(postId);
      deletedPost?.(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
      showSnackbar("Failed to delete post. Please try again.", "error");
    }
  };

  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const toggleComment = () => {
    setIsCommentClicked((prev) => !prev);
  };

  const resetForm = () => {
    setPost?.({ content: "", image: undefined, imageLink: "", videoLink: "" });
  };


  return {
    isEdit,
    isCommentClicked,
    handleSubmission,
    handlePost,
    editedContent,
    handleSaveContent,
    postContentRef,
    setIsEdit,
    toggleEdit,
    toggleComment,
    handleDeletePost,
    handleCloseSnackbar,
    snackbar,
  };
};
