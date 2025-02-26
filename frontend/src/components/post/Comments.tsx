import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateContent from "../CreateContent";
import {
  createComment,
  fetchCommentsByPostId,
} from "@/services/commentService";
import AvatarWithName from "../AvatarWithName";

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
}

export interface CommentProps {
  isCommentClicked: boolean;
  post: Post;
  toggleComment: () => void;
}

const Comments: React.FC<CommentProps> = ({
  isCommentClicked,
  post,
  toggleComment,
}) => {
  const [commentClicked, setIsCommentClicked] = useState(isCommentClicked);
  const [comments, setComments] = useState<Comment[]>([]);
  const handleCloseComment = () => {
    toggleComment();
    setIsCommentClicked(false);
  };

  const sendComment = async (comment: string) => {
    const newComment = await createComment(comment, post.id);
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  useEffect(() => {
    setIsCommentClicked(isCommentClicked);

    if (isCommentClicked) {
      const fetchComments = async () => {
        try {
          const comments = await fetchCommentsByPostId(post.id);
          setComments(comments);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };

      fetchComments();
    }
  }, [isCommentClicked, post.id]);

  return (
    <div>
      <Drawer
        anchor="right"
        open={isCommentClicked}
        onClose={handleCloseComment}
      >
        <div
          className="w-[74vw] flex h-screen border items-end"
          style={{ backgroundColor: "#B9D4F2" }}
        >
          {/* close */}

          {/* Post Section */}
          <div className="flex-[65%] h-full flex justify-center items-center flex-col">
            <div className="w-[80%] rounded-xl p-10 bg-white flex flex-col justify-center">
              <AvatarWithName
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

          {/* Comment Section */}
          <div
            className="p-5 w-[40%] bg-white flex flex-col justify-end h-[90%] mb-4"
            style={{ borderRadius: "20px 20px 0px 0px" }}
          >
            <div className="text-2xl mb-5">Comment Section</div>
            <div className="h-[90%] overflow-y-auto mb-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="mb-3">
                    <AvatarWithName
                      avatarLink={post.avatarLink}
                      name={comment.content}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400">No Comments Yet</div>
              )}
            </div>
            <CreateContent createContent={sendComment} placeholder="Write a comment"/>
          </div>
          <div className="px-3 py-2 h-full">
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
