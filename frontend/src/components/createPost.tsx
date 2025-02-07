import { useState } from "react";
import { submitPost } from "@/services/postService";

type Post = {
  id: number;
  userId?: number;
  content: string;
  imageLink: string;
  videoLink: string;
};

type ChildProps = {
  updatedPosts: (data: Post) => void;
};

const CreatePost: React.FC<ChildProps> = ({ updatedPosts }) => {
  const [post, setPost] = useState({
    userId: 3,
    content: "",
    imageLink: "",
    videoLink: "",
  });

  const handlePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmission = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = await submitPost(post);
    updatedPosts(newPost);
    setPost({ userId: 3, content: "", imageLink: "", videoLink: "" });
  };

  return (
    <div className="border border-yellow-50 w-[40vw] mb-10 p-5 rounded-xl">
      <form onSubmit={handleSubmission}>
        <input
          type="text"
          name="content"
          id="content"
          value={post.content}
          onChange={handlePost}
          autoComplete="false"
          className="w-full bg-transparent border border-red-500 h-[8vh] p-3 mb-4 rounded-xl"
          placeholder="What's on your Mind?"
        />
        <div className="flex justify-end">
          <button className="bg-red-700 w-[7vw] h-[4vh] rounded-xl">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
