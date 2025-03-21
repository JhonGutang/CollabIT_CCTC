import { Button, CircularProgress } from "@mui/material";
import { Flame, MessageCircle, Share2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  addReactionToPost,
  removeReactionFromPost,
} from "@/services/postService";
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
  reactionCount,
  commentsCount,
  reactionId,
  toggleComment,
}) => {
  const [isReacted, setIsReacted] = useState(reactionId ? true : false);
  const [initialCount, setInitialCount] = useState(reactionCount);
  const [currentReactionId, setCurrentReactionId] = useState(reactionId);
  const [hasToggled, setHasToggled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReactionToggle = () => {
    setIsReacted((prev) => {
      const newValue = !prev;
      setHasToggled(true);
      return newValue;
    });
  };

  const loadingState = () => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    if (!hasToggled) return;

    const isReactionRequest = async () => {
      setLoading(true);
      if (isReacted) {
        const newReactionId = await addReactionToPost(postId);
        setCurrentReactionId(newReactionId);
        setInitialCount((prev) => (prev += 1));
      } else {
        removeReactionFromPost(currentReactionId);
        setInitialCount((prev) => (prev -= 1));
      }
      loadingState();
    };

    isReactionRequest();
  }, [isReacted, hasToggled]);

  return (
    <div className="flex text-sm w-full">
      <Button
        variant="contained"
        className={isReacted ? "active-reaction-button" : "reaction-button"}
        onClick={handleReactionToggle}
      >
        <div className="flex gap-1 items-center">
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <>
              <Flame size={20} />
              {initialCount !== 0 && <div>{initialCount}</div>}
            </>
          )}
        </div>
      </Button>
      <Button
        variant="contained"
        className="reaction-button"
        onClick={toggleComment}
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
