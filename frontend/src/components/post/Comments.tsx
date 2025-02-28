import React, { useEffect, useState, MouseEvent } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { EllipsisVertical, Trash2 } from "lucide-react";

import CreateContent from "../CreateContent";
import AvatarWithContents from "../AvatarWithContents";
import CustomSnackbar from "../Snackbar";

import {
  createComment,
  deleteComment,
  fetchCommentsByPostId,
} from "@/services/commentService";
import { getUserDataFromLocal } from "@/services/userService";

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
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
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
      setComments((prev) => [newComment, ...prev]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>, commentId: number) => {
    setMenuAnchor(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleConfirmDelete = () => {
    setConfirmDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteComment = async () => {
    if (selectedCommentId !== null) {
      try {
        await deleteComment(selectedCommentId);
        setComments((prev) => prev.filter((comment) => comment.id !== selectedCommentId));
        setSnackbar({ open: true, message: "Comment deleted successfully!" });
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
    setConfirmDialogOpen(false);
  };

  return (
    <div>
      <CustomSnackbar
        message={snackbar.message}
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />

      <ConfirmDialog
        open={isConfirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleDeleteComment}
      />

      <Drawer anchor="right" open={isCommentClicked} onClose={handleCloseComment}>
        <div className="w-[74vw] flex h-screen border items-end" style={{ backgroundColor: "#B9D4F2" }}>
          <PostContent post={post} />

          <CommentSection
            comments={comments}
            currentUserId={currentUserId}
            onMenuOpen={handleMenuOpen}
            onAddComment={handleAddComment}
          />

          <div className="px-3 py-2 h-full">
            <IconButton onClick={handleCloseComment}>
              <FontAwesomeIcon icon={faClose} />
            </IconButton>
          </div>
        </div>
      </Drawer>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem onClick={handleConfirmDelete}>
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
      <AvatarWithContents avatarLink={post.avatarLink} name={post.username} size={60} />
      {post.imageLink || post.videoLink ? (
        <img src={post.imageLink} alt="" className="post-images rounded-xl mt-5" />
      ) : (
        <div className="mt-7 rounded-xl border-2 border-blue-300 min-h-[20vh] p-5 flex items-center justify-center">
          <div className="text-xl">{post.content}</div>
        </div>
      )}
    </div>
  </div>
);

const CommentSection: React.FC<{
  comments: Comment[];
  currentUserId: number | undefined;
  onMenuOpen: (event: MouseEvent<HTMLButtonElement>, commentId: number) => void;
  onAddComment: (comment: string) => void;
}> = ({ comments, currentUserId, onMenuOpen, onAddComment }) => (
  <div className="p-5 w-[40%] bg-white flex flex-col justify-end h-[90%] mb-4" style={{ borderRadius: "20px 20px 0px 0px" }}>
    <div className="text-xl mb-5">Comment Section</div>
    <div className="h-[90%] overflow-y-auto mb-4">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="mb-5 flex items-center justify-between">
            <AvatarWithContents size={50} avatarLink={comment.avatarLink} name={comment.username} content={comment.content} id={comment.id} />
            {currentUserId === comment.user_id && (
              <IconButton onClick={(event) => onMenuOpen(event, comment.id)}>
                <EllipsisVertical size={20} />
              </IconButton>
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400">No Comments Yet</div>
      )}
    </div>
    <CreateContent createContent={onAddComment} placeholder="Write a comment" />
  </div>
);

const ConfirmDialog: React.FC<{ open: boolean; onClose: () => void; onConfirm: () => void }> = ({
  open,
  onClose,
  onConfirm,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirm Deletion</DialogTitle>
    <DialogContent>Are you sure you want to delete this comment? This action cannot be undone.</DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="error">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default Comments;
