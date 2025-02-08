import React, { useState, forwardRef, useImperativeHandle } from "react";

interface Post {
  id: number;
  userId: number;
  content: string;
  imageLink?: string;
  videoLink?: string;
}

type PostProps = {
  post: Post;
};

const PostContent = forwardRef(({ post }: PostProps, ref) => {
  const [content, setContent] = useState(post.content);

  useImperativeHandle(ref, () => ({
    getContent: () => content, 
  }));

  const handlePostContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="w-full h-[15vh]">
      <textarea
        value={content}
        onChange={handlePostContent}
        className="border border-white bg-transparent w-full h-full px-5 py-3 resize-none rounded-xl"
      />
    </div>
  );
});

export default PostContent;
