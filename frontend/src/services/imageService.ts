let fileInputRef: HTMLInputElement | null = null;

export const setFileInputRef = (ref: HTMLInputElement | null) => {
  fileInputRef = ref;
};

export const handleImageClick = () => {
  if (fileInputRef) {
    fileInputRef.click();
  }
};

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPost: React.Dispatch<
    React.SetStateAction<{ userId: number; content: string; imageLink: string; videoLink: string }>
  >
) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPost((prevPost) => ({ ...prevPost, image:file, imageLink: imageUrl }));
  }
};
