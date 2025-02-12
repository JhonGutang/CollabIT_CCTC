import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import { reactingPost, removingReactionOnPost } from "@/services/postService";
import React, { useEffect, useState } from "react";
import Comments from "./Comments";

export interface ReactionProps {
  postId: number;
  userId: number;
  reactionCount: number;
  commentsCount: number;
  reactionId: number;
  toggleComment: () => void;
}

const ActionButtons: React.FC<ReactionProps> = ({
  postId,
  userId,
  reactionCount,
  commentsCount,
  reactionId,
  toggleComment
}) => {
  const [newReactionid, setNewReactionId] = useState<number>(reactionId);
  const [changingReactionCount, setChangingReactionCount] = useState<number>(
    reactionCount || 0
  );
  const [isReacted, setIsReacted] = useState(newReactionid ? true : false);
  const [initialRender, setInitialRender] = useState(true);

  const handleReaction = () => {
    setIsReacted(!isReacted);
  };

  const handleCommentClicked = () => {
    toggleComment()
  }

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }

    const handleAsyncReaction = async () => {
      if (isReacted) {
        const newId = await reactingPost(postId, userId);
        setNewReactionId(newId);
        setChangingReactionCount((prevCount) => prevCount + 1);
      } else {
        setNewReactionId((prevReactionId) => {
          removingReactionOnPost(prevReactionId);
          return prevReactionId;
        });
        setChangingReactionCount((prevCount) => prevCount - 1);
      }
    };

    handleAsyncReaction();
  }, [isReacted]);

  return (
    <div className="flex text-sm w-full">
      <Button
        variant="contained"
        className={isReacted ? "active-reaction-button" : "reaction-button"}
        onClick={handleReaction}
      >
        <FontAwesomeIcon className="me-2" icon={faFire} />
        {changingReactionCount !== 0 && <div>{changingReactionCount}</div>}
      </Button>
      <Button variant="contained" className="reaction-button" onClick={handleCommentClicked}>
        <FontAwesomeIcon className="me-2" icon={faComment} />
        <div>{commentsCount}</div>
      </Button>
      <Button variant="contained" className="reaction-button">
        <FontAwesomeIcon className="me-2" icon={faShare} />
      </Button>

    </div>


  );
};

export default ActionButtons;
