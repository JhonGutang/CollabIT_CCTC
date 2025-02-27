
export interface FileContent {
  imageLink?: string;
  image?: File;
  videoLink?: string;
}

let fileInputRef: HTMLInputElement | null = null;

export const setFileInputRef = (ref: HTMLInputElement | null) => {
  fileInputRef = ref;
};

export const handleImageClick = () => {
  if (fileInputRef) {
    fileInputRef.click();
  }
};

export const fileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    return {
      image: file,
      imageLink: imageUrl
    }
  }
};
