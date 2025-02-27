import React, { useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { fileChange, handleImageClick, setFileInputRef } from "@/services/imageService";
import { MessageToSend } from "./conversation/Conversation";
import { PostToSend } from "./post/CreatePost";

type ImageUploadProps = {
    setImage: React.Dispatch<React.SetStateAction<MessageToSend>> | React.Dispatch<React.SetStateAction<PostToSend>>;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ setImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageData = fileChange(e)
    console.log(imageData);
    if(imageData){
        setImage((prev) => ({
            ...prev,
            image: imageData.image,
            imageLink: imageData.imageLink

        }))
    }
  }


  useEffect(() => {
    setFileInputRef(fileInputRef.current);
  }, []);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <IconButton onClick={handleImageClick}>
        <FontAwesomeIcon color="white" icon={faImage} />
      </IconButton>
    </div>
  );
};

export default ImageUpload;
