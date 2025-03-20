import { addToFriends } from "@/services/userService";
import { Post } from "@/types/post";
import { useEffect, useState } from "react";

interface UserActionsProps {
  post: Post;
  areFriends: boolean;
}

export const useUserActions = ({ post, areFriends }: UserActionsProps) => {
  const [isFriend, setIsFriend] = useState(areFriends);
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

  return {
    isFriend,
    handleAddFriends,
    snackbar,
  };
};
