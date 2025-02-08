import React from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";

interface SnackbarProps {
  message: string;
  open: boolean;
  onClose: () => void;
  autoHideDuration?: number;
  position?: SnackbarOrigin;
}

const CustomSnackbar: React.FC<SnackbarProps> = ({
  message,
  open,
  onClose,
  autoHideDuration = 5000,
  position = { vertical: "top", horizontal: "center" },
}) => {
  return (
    <Snackbar
      anchorOrigin={position}
      autoHideDuration={autoHideDuration}
      open={open}
      onClose={onClose}
    >
      <div className="custom-snackbar">
      {message}
      </div>
    </Snackbar>
  );
};

export default CustomSnackbar;
