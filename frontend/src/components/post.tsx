import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { deletePost, updatePost } from "@/services/postService";
import PostContent from "./postContent";

type Post = {
  id: number;
  userId: number;
  content: string;
  imageLink: string;
  videoLink: string;
};

type PostProps = {
  post: Post;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const postContentRef =  useRef<{ getContent: () => string }>(null)

  const handleSaveContent = () => {
    if (postContentRef.current) {
      const content = postContentRef.current.getContent();
      setEditedContent(content); 
      updatePost({ ...post, content: content });
      setIsEdit(false); 
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
    setShowDropdown(false);
  };

  const handleDeletePost = (postId: number) => {
    deletePost(postId);
  };

  return (
    <div className="border border-red-500 h-auto mb-5 w-[40vw] rounded-xl p-6 relative">
      {/* User Profile */}
      <div className="flex items-center justify-between mb-4 pr-4">
        <div className="flex items-center">
          <img
            src="https://i.pinimg.com/736x/11/48/01/1148010bc6df885075a558384b3dbc6b.jpg"
            className="rounded-full me-3"
            width={50}
            alt=""
          />
          <div>
            <div className="font-semibold">User</div>
            <div className="text-xs">2 mins ago</div>
          </div>
        </div>
        <div className="relative">
          {isEdit ? (
            <div>
              <button className="me-5" onClick={handleSaveContent}>
                <FontAwesomeIcon icon={faFloppyDisk} />
              </button>
              <button onClick={toggleEdit}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ) : (
            <div>
              <button onClick={toggleDropdown} className="p-2">
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
            </div>
          )}

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 w-40 bg-black border border-gray-300 shadow-md rounded-md z-10">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-red-400"
                onClick={toggleEdit}
              >
                Edit Post
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-red-400"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      {isEdit ? (
        <PostContent
          ref={postContentRef} // Pass the ref to the child component
          post={{ ...post, content: editedContent }}
        />
      ) : (
        <div>
          <div className="w-full flex justify-center mb-7">
            <div className="w-full">{editedContent}</div>

            {post.imageLink && (
              <div>
                <img
                  src={post.imageLink}
                  alt="Post image"
                  className="rounded-xl"
                />
              </div>
            )}
            {post.videoLink && <video src={post.videoLink} controls />}
          </div>
          {/* Reaction Buttons */}
          <div className="flex text-sm w-full">
            <button className="reaction-button">Fire</button>
            <button className="reaction-button w-[9vw]">Comment</button>
            <button className="reaction-button w-[7vw]">Share</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
