import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateContent from "../CreateContent";
import { createComment, fetchCommentsByPostId } from "@/services/commentService";
import AvatarWithName from "../AvatarWithName";


export interface CommentProps {
  isCommentClicked: boolean;
  postId: number;
  toggleComment: () => void;
}

export interface Comment {
  id: number,
  user_id: number,
  username: string,
  content: string,
  image_link: string,
}

const Comments: React.FC<CommentProps> = ({
  isCommentClicked,
  postId,
  toggleComment,
}) => {
  const [commentClicked, setIsCommentClicked] = useState(isCommentClicked);
  const [comments, setComments] = useState<Comment[]>([]);
  const handleCloseComment = () => {
    toggleComment();
    setIsCommentClicked(false);
  };

  const sendComment = async(comment: string) => {
    const newComment = await createComment(comment, postId)
    setComments((prevComments) => [newComment, ...prevComments])
  }


  useEffect(() => {
    setIsCommentClicked(isCommentClicked);
    
    if (isCommentClicked) {
      const fetchComments = async () => {
        try {
          const comments = await fetchCommentsByPostId(postId);
          setComments(comments);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
  
      fetchComments();
    }
  }, [isCommentClicked, postId]);
  
  return (
    <div>
      <Drawer
        anchor="right"
        open={isCommentClicked}
        onClose={handleCloseComment}
      >
        <div className="w-[74vw] flex h-screen">
          {/* close */}

          {/* Post Section */}
          <div className="flex-3 flex-col border-r-2">
            <div className="h-2/3">
                this is post section
            </div>
            <div className="flex justify-center gap-4 mt-2">
                <CreateContent createContent={sendComment} location="comments"/>
            </div>
          </div>

          {/* Comment Section */}
          <div className="flex-2 py-5 px-3">
            <div className="text-2xl mb-5">
              Comment Section
            </div>
            {comments.map((comment) => (
              <div key={comment.id} className="mb-3">
                <AvatarWithName name={comment.content}/>
              </div>
            ))}
          </div>
          <div className="px-3 py-2">
            <IconButton className="" onClick={handleCloseComment}>
              <FontAwesomeIcon icon={faClose} />
            </IconButton>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Comments;
