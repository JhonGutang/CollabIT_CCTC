'use client'

import { Button } from "@mui/material";
import {  useState } from "react";
import { Comment } from "./Main";
import { updateComment } from "@/services/commentService";

type EditCommentsProps = {
  comment: { id: number; content: string } | null;
  updateLocally?: (comment: Comment) => void;
  onClose: () => void;
};

const EditComments: React.FC<EditCommentsProps> = ({ comment, onClose, updateLocally }) => {
  const [content, setContent] = useState(comment?.content || '');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSave = async () => {
    if (comment) {
      const response = await updateComment({ id: comment.id, content });
      if(updateLocally && response) updateLocally(response.data)
      onClose();
    }
  };

  return (
    <div className="w-[40vw] h-70 flex flex-col custom-base-container p-8">
      <div className="mb-2 text-xl">Edit Comments</div>
      <div className="border flex-grow mb-4">
        <textarea 
          value={content}
          onChange={handleChange}
          className="w-full h-full px-3 py-2 resize-none" 
          style={{ height: '100%' }} 
        ></textarea>
      </div>
      <div className="flex gap-3">
        <Button variant="contained" onClick={handleSave}>Save</Button>
        <Button variant="contained" onClick={onClose}>Cancel</Button>
      </div>
    </div>
  );
};

export default EditComments;
