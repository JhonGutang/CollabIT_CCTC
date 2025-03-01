import React, { MouseEvent,  useState } from "react";
import AvatarWithContents from "../AvatarWithContents";
import CreateContent from "../CreateContent";
import { Comment } from "./Main"; 
import { Menu, MenuItem, Dialog } from "@mui/material";
import EditComments from "./EditComments";

interface CommentSectionProps {
  comments: Comment[];
  currentUserId?: number;
  onMenuOpen: (event: MouseEvent<HTMLButtonElement>, commentId: number) => void;
  onAddComment: (comment: string) => void;
  editingCommentId: number | null;
  onEditComment: (commentId: number) => void;
  onDeleteComment: (commentId: number) => void;
  updateLocally?: (comment: Comment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
  editingCommentId,
  onDeleteComment,
  updateLocally,
}) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState<Comment | null>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>, commentId: number) => {
    setMenuAnchor(event.currentTarget);
    setSelectedCommentId(commentId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    if (selectedCommentId !== null) {
      const commentToEdit = comments.find(comment => comment.id === selectedCommentId);
      setCurrentComment(commentToEdit || null);
      setIsModalOpen(true);
      handleMenuClose();
    }
  };

  const handleDelete = () => {
    if (selectedCommentId !== null) {
      onDeleteComment(selectedCommentId);
      handleMenuClose();
    }
  };

  


  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentComment(null);
  };

  return (
    <>
      <div
        className="p-5 w-[40%] bg-white flex flex-col justify-end h-[90%] mb-4"
        style={{ borderRadius: "20px 20px 0px 0px" }}
      >
        <div className="text-xl mb-5">Comment Section</div>
        <div className="h-[90%] overflow-y-auto mb-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="mb-5 flex items-center justify-between"
              >
                <AvatarWithContents
                  size={50}
                  avatarLink={comment.avatarLink}
                  name={comment.username}
                  isEditing={editingCommentId === comment.id}
                  content={comment.content}
                  id={comment.id}
                  onMenuOpen={(event) => handleMenuOpen(event, comment.id)}
                />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No Comments Yet</div>
          )}
        </div>
        <CreateContent createContent={onAddComment} placeholder="Write a comment" />
        
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            Delete
          </MenuItem>
        </Menu>
      </div>
      <Dialog 
        open={isModalOpen} 
        onClose={handleModalClose} 
        sx={{ "& .MuiDialog-paper": { borderRadius: "20px" } }} 
      >
        <EditComments comment={currentComment} onClose={handleModalClose} updateLocally={updateLocally} />
      </Dialog>
    </>
  );
};

export default CommentSection;
