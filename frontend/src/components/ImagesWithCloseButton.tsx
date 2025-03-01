import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Button } from "@mui/material";
import React from "react";

export interface ImageProps {
  imageLink: string;
  onRemove: () => void;
}

const ImagesWithCloseButton: React.FC<ImageProps> = ({ imageLink, onRemove }) => {
  return (
    <div className="h-[20vh] mt-4 pl-2 relative">
      <div className="inline-block max-w-full h-full rounded-xl relative">
        <div className="absolute top-0 right-0 p-1">
          <IconButton className="delete-image-button" onClick={onRemove}>
            <FontAwesomeIcon color="white" size="xs" icon={faClose} />
          </IconButton>
        </div>
        <img src={imageLink} alt="" className="create-post-with-images" />
      </div>
    </div>
  );
};

export default ImagesWithCloseButton;
