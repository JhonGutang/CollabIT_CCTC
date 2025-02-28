import { Button } from "@mui/material";
import { Flame, MessageCircle, Share, Share2 } from "lucide-react";
import {
  addReactionToPost,
  removeReactionFromPost,
} from "@/services/postService";
import React, { useEffect, useState } from "react";

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
  toggleComment,
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
    toggleComment();
  };

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      return;
    }

    const handleAsyncReaction = async () => {
      if (isReacted) {
        const newId = await addReactionToPost(postId);
        setNewReactionId(newId);
        setChangingReactionCount((prevCount) => prevCount + 1);
      } else {
        setNewReactionId((prevReactionId) => {
          removeReactionFromPost(prevReactionId);
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
        <div className="flex gap-1 items-center">
          <Flame size={20} />
          <div>
            {changingReactionCount !== 0 && <div>{changingReactionCount}</div>}
          </div>
        </div>
      </Button>
      <Button
        variant="contained"
        className="reaction-button"
        onClick={handleCommentClicked}
      >
        <div className="flex gap-1 items-center">

        <MessageCircle size={20} />
        <div>{commentsCount}</div>
        </div>
      </Button>
      <Button variant="contained" className="reaction-button">
        <Share2 size={20} />
      </Button>
    </div>
  );
};

export default ActionButtons;
