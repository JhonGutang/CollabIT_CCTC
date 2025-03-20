import { Ellipsis, Save, UserRoundPlus, X } from "lucide-react";
import ActionButtons from "./ActionButtons";
import EditPostContent from "./EditPostContent";
import Snackbar from "../Snackbar";
import DropdownMenu from "./DropdownMenu";
import Comments from "../comments/Main";
import AvatarWithContents from "../AvatarWithContents";
import { Post as IPost } from "@/types/post";
import { usePostActions } from "@/hooks/usePostActions";
import { useUserActions } from "@/hooks/useUserActions";

interface PostProps {
  post: IPost;
  userId: number;
  areFriends: boolean;
  deletedPost: (postId: number) => void;
}

const Post: React.FC<PostProps> = ({
  post,
  userId,
  deletedPost,
  areFriends,
}) => {
  const {
    isEdit,
    isCommentClicked,
    editedContent,
    handleSaveContent,
    postContentRef,
    toggleEdit,
    toggleComment,
    handleDeletePost,
    handleCloseSnackbar,
  } = usePostActions({ post, deletedPost });
  const { isFriend, handleAddFriends, snackbar } = useUserActions({post, areFriends});

  const menuItems = [
    {
      label: "Edit Post",
      onClick: toggleEdit,
    },
    {
      label: "Delete",
      onClick: () => handleDeletePost(post.id),
    },
  ];

  return (
    <div className="relative h-auto mb-5 custom-base-container p-6">
      <div className="relative">
        {/* User Profile */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="relative">
              <AvatarWithContents
                avatarLink={post.avatarLink}
                size={50}
                name={post.username}
                time="2mins ago"
              />
            </div>
          </div>
          <div className="relative">
            {isEdit && (
              <div>
                <button
                  className="me-5 cursor-pointer"
                  onClick={handleSaveContent}
                >
                  <Save />
                </button>
                <button onClick={toggleEdit} className="cursor-pointer">
                  <X />
                </button>
              </div>
            )}

            {!isEdit && userId === post.userId && (
              <DropdownMenu
                buttonIcon={<Ellipsis />}
                menuItems={menuItems}
                onClose={() => {}}
              />
            )}

            {!isFriend && (
              <div
                className="cursor-pointer me-3"
                onClick={() => handleAddFriends(post.userId)}
              >
                <UserRoundPlus color="green" />
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        {isEdit ? (
          <EditPostContent ref={postContentRef} post={post} />
        ) : (
          <div>
            <div className="w-full flex-col items-center mb-7">
              <div className="w-full mb-4">{editedContent}</div>
              {post.imageLink && (
                <div className="w-full flex justify-center rounded-xl">
                  <img
                    src={post.imageLink}
                    alt="Post image"
                    className="rounded-xl post-images"
                  />
                </div>
              )}
              {post.videoLink && <video src={post.videoLink} controls />}
            </div>

            {/* Reaction Buttons */}
            <ActionButtons
              userId={userId}
              postId={post.id}
              reactionCount={post.reactionCount}
              commentsCount={post.commentsCount}
              reactionId={post.reactionId}
              toggleComment={toggleComment}
            />
          </div>
        )}
      </div>

      <Comments
        isCommentClicked={isCommentClicked}
        toggleComment={toggleComment}
        post={post}
      />

      <Snackbar
        color=""
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};


export default Post;
