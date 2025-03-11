import React, { useEffect, useState, MouseEvent } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Drawer,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Trash2, SquarePen } from "lucide-react";
import AvatarWithContents from "../AvatarWithContents";
import CustomSnackbar from "../Snackbar";
import ConfirmDialog from "../ConfirmationDialog";

import {
  createComment,
  deleteComment,
  fetchCommentsByPostId,
} from "@/services/commentService";
import { getUserDataFromLocal } from "@/services/userService";
import CommentSection from "./CommentSection";

export interface Post {
  id: number;
  imageLink?: string;
  videoLink?: string;
  content?: string;
  username: string;
  avatarLink: string;
}

export interface Comment {
  id: number;
  user_id: number;
  username: string;
  content: string;
  image_link: string;
  avatarLink: string;
}

interface CommentProps {
  isCommentClicked: boolean;
  post: Post;
  toggleComment: () => void;
}

const Comments: React.FC<CommentProps> = ({
  isCommentClicked,
  post,
  toggleComment,
}) => {
  const currentUserId = getUserDataFromLocal()?.id;
  const [comments, setComments] = useState<Comment[]>([]);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    if (isCommentClicked) {
      fetchComments();
    }
  }, [isCommentClicked, post.id]);

  const fetchComments = async () => {
    try {
      const fetchedComments = await fetchCommentsByPostId(post.id);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCloseComment = () => {
    toggleComment();
  };

  const handleAddComment = async (comment: string) => {
    try {
      const newComment = await createComment(comment, post.id);
      if(newComment) setComments((prev) => [newComment, ...prev]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleMenuOpen = (
    event: MouseEvent<HTMLButtonElement>,
    commentId: number
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleDeleteComment = (commentId: number) => {
    setSelectedCommentId(commentId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCommentId !== null) {
      try {
        await deleteComment(selectedCommentId);
        setComments((prev) =>
          prev.filter((comment) => comment.id !== selectedCommentId)
        );
        setSnackbar({ open: true, message: "Comment deleted successfully!" });
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
    setConfirmDialogOpen(false);
  };

  const handleEdit = (commentId: number) => {
    setEditingCommentId(commentId);
    handleMenuClose();
  };

  const updateCommentsLocally = (updatedComment: Comment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
    setSnackbar({ open: true, message: "Comment updated successfully!" });
  }

  return (
    <div>
      <CustomSnackbar
        color="success"
        message={snackbar.message}
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      <ConfirmDialog
        open={isConfirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <Drawer
        anchor="right"
        open={isCommentClicked}
        onClose={handleCloseComment}
      >
        <div
          className="w-[76vw] flex h-screen border items-end"
          style={{ backgroundColor: "#B9D4F2" }}
        >
          <PostContent post={post} />

          <CommentSection
            comments={comments}
            currentUserId={currentUserId}
            onMenuOpen={handleMenuOpen}
            onAddComment={handleAddComment}
            editingCommentId={editingCommentId}
            onEditComment={handleEdit}
            onDeleteComment={handleDeleteComment}
            updateLocally={updateCommentsLocally}
          />

          <div className="px-3 py-2 h-full">
            <IconButton onClick={handleCloseComment}>
              <FontAwesomeIcon icon={faClose} />
            </IconButton>
          </div>
        </div>
      </Drawer>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEdit(selectedCommentId!)}>
          <SquarePen size={18} className="mr-2" />
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDeleteComment(selectedCommentId!)}>
          <Trash2 size={18} className="mr-2" />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

const PostContent: React.FC<{ post: Post }> = ({ post }) => (
  <div className="flex-[65%] h-full flex justify-center items-center flex-col">
    <div className="w-[80%] rounded-xl p-10 bg-white flex flex-col justify-center">
      <AvatarWithContents
        avatarLink={post.avatarLink}
        name={post.username}
        size={60}
      />
      {post.imageLink || post.videoLink ? (
        <img
          src={post.imageLink}
          alt=""
          className="post-images rounded-xl mt-5"
        />
      ) : (
        <div className="mt-7 rounded-xl border-2 border-blue-300 min-h-[20vh] p-5 flex items-center justify-center">
          <div className="text-xl">{post.content}</div>
        </div>
      )}
    </div>
  </div>
);

export default Comments;

